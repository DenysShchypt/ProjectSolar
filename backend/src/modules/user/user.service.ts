import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import * as bcryptjs from 'bcryptjs';
import { AppError } from 'common/constants/errors';
import { RegisterDTO } from 'modules/auth/dto';
import { PrismaService } from 'modules/prisma/prisma.service';
import { Role } from '@prisma/client';
import {
  USER_ALL_INFO,
  USER_SELECT_FIELDS,
} from 'common/constants/select-return';
import { ConfigService } from '@nestjs/config';
import sendEmail from '../../../libs/helpers/nodemailer';
import { INewUser, IUser } from 'interfaces/user';
import validator from 'validator';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  private async isValidUuid(val: string): Promise<boolean> {
    return validator.isUUID(val);
  }

  async createUser(dto: RegisterDTO): Promise<INewUser> {
    const checkUserInDB = await this.prismaService.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (checkUserInDB && dto.providerId) {
      await this.cacheManager.set(checkUserInDB.id, checkUserInDB);
      await this.cacheManager.set(checkUserInDB.email, checkUserInDB);
      return checkUserInDB;
    }

    if (checkUserInDB) throw new BadRequestException(AppError.USER_EXIST);

    if (dto.password) {
      const salt = await bcryptjs.genSalt();
      dto.password = await bcryptjs.hash(dto.password, salt);
      dto.passwordRepeat = await bcryptjs.hash(dto.passwordRepeat, salt);
    }

    const createNewUser: INewUser = await this.prismaService.user
      .create({
        data: {
          email: dto.email,
          firstName: dto.firstName,
          lastName: dto?.lastName,
          password: dto?.password,
          passwordRepeat: dto?.passwordRepeat,
          roles: [Role.USER],
          picture: dto?.picture,
          provider: dto?.provider,
          providerId: dto?.providerId,
          verifyLink: false,
        },
        select: USER_SELECT_FIELDS,
      })
      .catch((error) => {
        this.logger.error(`${AppError.USER_CREATE_ERROR}:${error.message}`);
        return null;
      });
    if (!createNewUser)
      throw new BadRequestException(AppError.REGISTER_USER_ERROR);
    const verifyEmail = {
      from: {
        name: 'WebSolar',
        address: this.configService.get('mail_from'),
      },
      to: createNewUser.email,
      subject: 'Verify account on WebSolar',
      html: `<p><strong>Hello ${createNewUser.firstName} ${createNewUser?.lastName}</strong>, you need to confirm your email<a target="_blank" href="${this.configService.get('base_url')}/auth/verify/${createNewUser.id}">For verify click here</a></p>`,
    };

    await sendEmail(verifyEmail);
    await this.cacheManager.set(createNewUser.id, createNewUser);
    await this.cacheManager.set(createNewUser.email, createNewUser);
    return createNewUser;
  }

  async getUserByEmailOrId(
    emailOrId: string,
    isReset: boolean = false,
  ): Promise<IUser> {
    if (isReset) {
      await this.cacheManager.del(emailOrId);
    }

    const userCache: IUser = await this.cacheManager.get(emailOrId);

    if (!userCache) {
      const user: IUser = await this.prismaService.user
        .findFirst({
          where: (await this.isValidUuid(emailOrId))
            ? { id: emailOrId }
            : { email: emailOrId },
          select: (await this.isValidUuid(emailOrId))
            ? USER_SELECT_FIELDS
            : USER_ALL_INFO,
        })
        .catch((error) => {
          this.logger.error(`${AppError.ERROR_DB}:${error.message}`);
          return null;
        });
      if (!user) throw new BadRequestException(AppError.USER_NOT_FOUND);
      await this.cacheManager.set(emailOrId, user);
      return user;
    }
    return userCache;
  }
}

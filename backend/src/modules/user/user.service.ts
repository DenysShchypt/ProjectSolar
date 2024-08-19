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
import { USER_SELECT_FIELDS } from 'common/constants/select-return';
import { ConfigService } from '@nestjs/config';
import sendEmail from '../../../libs/helpers/nodemailer';
import { ResponseCreateNewUser } from './responses';
import { INewUser } from 'interfaces/user';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async createUser(dto: RegisterDTO): Promise<ResponseCreateNewUser> {
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
      html: `<p><strong>Hello ${createNewUser.firstName} ${createNewUser?.lastName}</strong>, you need to confirm your email<a target="_blank" href="${this.configService.get('base_url')}/auth/verify/${createNewUser.verifyLink}">For verify click here</a></p>`,
    };

    await sendEmail(verifyEmail);
    await this.cacheManager.set(createNewUser.id, createNewUser);
    await this.cacheManager.set(createNewUser.email, createNewUser);
    return createNewUser;
  }
}

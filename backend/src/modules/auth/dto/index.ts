import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Provider } from '@prisma/client';
import {
  IsAlpha,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
  Validate,
  ValidateIf,
} from 'class-validator';
import { IsPasswordsMatching } from '../../../../libs/decorators/isPasswordMatchingConstraint.decorator';

export class LoginDTO {
  @ApiProperty({ example: 'Denys@example.com' })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiPropertyOptional()
  @ValidateIf((o) => o.provider !== 'GOOGLE')
  @IsNotEmpty()
  @IsString()
  @Length(10, 20)
  @Matches(/^.*$/, { message: 'Field must contain any characters' })
  password?: string;
}

export class RegisterDTO extends LoginDTO {
  @ApiProperty({ example: 'Denys' })
  @IsNotEmpty()
  @IsString()
  @Length(3, 20)
  @IsAlpha('en-US', {
    message: 'Field must contain only Latin alphabet characters',
  })
  firstName: string;

  @ApiProperty({ example: 'Developer' })
  @IsOptional()
  @IsString()
  @Length(3, 20)
  @IsAlpha('en-US', {
    message: 'Field must contain only Latin alphabet characters',
  })
  lastName: string;

  @ApiPropertyOptional()
  @ValidateIf((o) => o.provider !== 'GOOGLE')
  @IsNotEmpty()
  @IsString()
  @Length(10, 20)
  @Matches(/^.*$/, { message: 'Field must contain any characters' })
  @Validate(IsPasswordsMatching)
  passwordRepeat?: string;

  // @ApiPropertyOptional({ example: 'GOOGLE', enum: Provider })
  @ValidateIf((o) => o.provider === 'GOOGLE')
  @IsEnum(Provider)
  @IsOptional()
  provider?: Provider;

  // @ApiPropertyOptional({ example: '46478642345867234548645' })
  @ValidateIf((o) => o.provider === 'GOOGLE')
  @IsString()
  @IsOptional()
  providerId?: string;

  // @ApiPropertyOptional({
  //   example:
  //     'https://lh3.googleusercontent.com/a/ACg8ocJ-OcEr6cr50Ak6Sz7LGMK6MXRH44O0ULhXbAtpn6lMa0OGlgQ=s96-c',
  // })
  @ValidateIf((o) => o.provider === 'GOOGLE')
  @IsString()
  @IsOptional()
  picture?: string;
}

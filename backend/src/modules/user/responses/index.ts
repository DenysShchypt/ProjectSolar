import { ApiProperty } from '@nestjs/swagger';
import { Provider, Role } from '@prisma/client';
import { IsBoolean, IsEnum, IsString } from 'class-validator';

export class ResponseCreateNewUser {
  @ApiProperty({ example: 'sdg5468gfh68f4dsh8642526' })
  @IsString()
  id: string;

  @ApiProperty({ example: 'John' })
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Joshua' })
  @IsString()
  lastName?: string;

  @ApiProperty({ example: 'john@example.com' })
  @IsString()
  email: string;

  @ApiProperty({ enum: Role, enumName: 'USER' })
  @IsEnum(Role, { each: true })
  roles: Role[];

  @ApiProperty({ enum: Provider, enumName: 'GOOGLE' })
  @IsEnum(Provider)
  provider?: Provider;

  @ApiProperty({ example: 'sdg5468gfh68f4dsh8642526' })
  @IsString()
  providerId?: string;

  @ApiProperty({ example: false })
  @IsBoolean()
  verifyLink: boolean;

  @ApiProperty({
    example:
      'https://lh3.googleusercontent.com/a/ACg8ocJ-OcEr6cr50Ak6Sz7LGMK6MXRH44O0ULhXbAtpn6lMa0OGlgQ=s96-c',
  })
  @IsString()
  picture?: string;
}

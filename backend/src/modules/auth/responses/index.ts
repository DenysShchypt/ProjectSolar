import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString } from 'class-validator';
import { ResponseCreateNewUser } from 'modules/user/responses';

class ResponseAccuseToken {
  @ApiProperty({
    example:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiZGVueXNzb3JAZGVuLmNvbSIsImZpcnN0TmFtZSI6IkRlcnNuIiwibGFzdE5hbWUiOiJEcmVmc2doanIiLCJpZCI6ImFlZTM3ZTA0LWQzODQtNDMyYi04M2ExLWE0YzRiODM0YWJiMiIsInJvbGVzIjpbIlVTRVIiXX0sImlhdCI6MTcyMTI0MDU5OCwiZXhwIjoxNzIxMjQxMTk4fQ.2NOCXEailgy_dhP5iWU-EusidgjlWCf6FgCme_m11cM',
  })
  @IsString()
  accuseToken: string;
}

class ResponseRefreshToken {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  @IsString()
  token: string;

  @ApiProperty({ example: '2024-07-11T23:59:59Z' })
  @IsDate()
  exp: Date;

  @ApiProperty({ example: '2a75219e-1d14-4497-ab63-b80d91e9410e' })
  @IsString()
  userId: string;

  @ApiProperty({
    example:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
  })
  @IsString()
  userAgent: string;
}

class ResponseTokens {
  @ApiProperty({
    example:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiZGVueXNzb3JAZGVuLmNvbSIsImZpcnN0TmFtZSI6IkRlcnNuIiwibGFzdE5hbWUiOiJEcmVmc2doanIiLCJpZCI6ImFlZTM3ZTA0LWQzODQtNDMyYi04M2ExLWE0YzRiODM0YWJiMiIsInJvbGVzIjpbIlVTRVIiXX0sImlhdCI6MTcyMTI0MDU5OCwiZXhwIjoxNzIxMjQxMTk4fQ.2NOCXEailgy_dhP5iWU-EusidgjlWCf6FgCme_m11cM',
  })
  @IsString()
  accuseToken: string;

  @ApiProperty({ type: () => ResponseRefreshToken })
  refreshToken: ResponseRefreshToken;
}

export class ResponseRegister extends ResponseCreateNewUser {
  @ApiProperty({ type: ResponseAccuseToken })
  token: ResponseAccuseToken;
}

export class ResponseRegisterVerify extends ResponseCreateNewUser {
  @ApiProperty({ type: ResponseTokens })
  token: ResponseTokens;
}
export class ResponseLogin extends ResponseRegisterVerify {}

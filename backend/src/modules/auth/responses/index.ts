import { ApiProperty } from '@nestjs/swagger';
import { ResponseAccuseToken } from 'modules/token/responses';
import { ResponseCreateNewUser } from 'modules/user/responses';

export class ResponseRegister extends ResponseCreateNewUser {
  @ApiProperty({ type: ResponseAccuseToken })
  token: ResponseAccuseToken;
}

export class ResponseRegisterVerify extends ResponseCreateNewUser {
  @ApiProperty({ type: ResponseAccuseToken })
  token: ResponseAccuseToken;
}
export class ResponseLogin extends ResponseRegisterVerify {}
export class ResponseRefreshTokenAndUser extends ResponseRegisterVerify {}

import { ApiProperty } from '@nestjs/swagger';
import { ITokenResponse } from 'interfaces/tokens';
import { ResponseCreateNewUser } from 'modules/user/responses';

export class ResponseRegister extends ResponseCreateNewUser {
  @ApiProperty({ type: ITokenResponse })
  token: ITokenResponse;
}

import { $Enums, Provider } from '@prisma/client';
import { ITokenResponse } from 'interfaces/tokens';

export interface IUserJWT {
  id: string;
  email: string;
  firstName: string;
  lastName?: string;
  roles: $Enums.Role[];
}

export interface IUserAndTokens extends IUserJWT {
  provider?: Provider;
  providerId?: string;
  verifyLink: boolean;
  picture?: string;
  token: ITokenResponse;
}

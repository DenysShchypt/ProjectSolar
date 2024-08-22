import { $Enums, Provider } from '@prisma/client';

export interface INewUser {
  id: string;
  email: string;
  firstName: string;
  lastName?: string;
  password?: string;
  passwordRepeat?: string;
  provider?: Provider;
  providerId?: string;
  verifyLink: boolean;
  picture?: string;
  roles: $Enums.Role[];
}

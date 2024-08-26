import { $Enums } from '@prisma/client';

export interface INewUser {
  id: string;
  email: string;
  firstName: string;
  lastName?: string;
  password?: string;
  passwordRepeat?: string;
  verifyLink: boolean;
  picture?: string;
  roles: $Enums.Role[];
}
export interface IUser extends INewUser {}

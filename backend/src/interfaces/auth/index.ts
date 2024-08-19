import { $Enums } from '@prisma/client';

export interface IUserJWT {
  id: string;
  email: string;
  firstName: string;
  lastName?: string;
  roles: $Enums.Role[];
}

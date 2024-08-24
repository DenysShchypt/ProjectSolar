import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

export interface IPropsLogin {
  setPassword: (value: string) => void;
  setEmail: (value: string) => void;
}

export interface IPropsRegister {
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  setPasswordRepeat: (value: string) => void;
}
// export interface IPropsLogin<TFieldValues extends IFormData = IFormData> {
//   navigate: (to: string) => void;
//   register: UseFormRegister<IFormData>;
//   errors: FieldErrors<TFieldValues>;
//   loading: boolean;
// }
// export interface IPropsRegister<
//   TFieldValues extends IFormDataRegister = IFormDataRegister,
// > {
//   register: UseFormRegister<IFormDataRegister | IFormData>;
//   navigate: (to: string) => void;
//   errors: FieldErrors<TFieldValues>;
//   loading: boolean;
// }

export interface IAccuseToken{
  accuseToken: string;
}

export interface IAuthState {
  user: IUser|null;
  isLoading: boolean;
}

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: Role[];
  picture?: string;
  verifyLink: boolean;
  token: IAccuseToken;
}

export interface IFormData extends FieldValues {
  email: string;
  password: string;
}

export interface IFormDataRegister extends IFormData {
  firstName: string;
  lastName: string;
  passwordRepeat: string;
}

enum Role {
  'ADMIN',
  'USER',
}

export interface IGoogleToken{
  token: string;
}
export interface IAccuseToken{
  accuseToken: string;
}

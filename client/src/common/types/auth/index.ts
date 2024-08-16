import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

export interface IPropsLogin<TFieldValues extends IFormData = IFormData> {
  navigate: (to: string) => void;
  register: UseFormRegister<IFormData>;
  errors: FieldErrors<TFieldValues>;
  loading: boolean;
}
export interface IPropsRegister<
  TFieldValues extends IFormDataRegister = IFormDataRegister,
> {
  register: UseFormRegister<IFormDataRegister | IFormData>;
  navigate: (to: string) => void;
  errors: FieldErrors<TFieldValues>;
  loading: boolean;
}

export interface IAuthState {
  user: IPublicUser;
  isLoading: boolean;
}

export interface IPublicUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: Role[];
  token: string;
  verifyLink: string;
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

export interface AuthGoogleData {
  token: string;
}

enum Role {
  "ADMIN",
  "USER",
}

import * as yup from 'yup';
import { AppError } from '../../common/errors';
export const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .email(AppError.Wrong_email)
    .required(AppError.Required_email),
  password: yup
    .string()
    .min(6, AppError.Min_length_password)
    .required(AppError.Required_password)
    .matches(
      /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!@#$%&?]{6,20}$/,
      AppError.Wrong_password,
    ),
});
export const RegisterSchema = yup.object().shape({
  firstName: yup.string().required(AppError.Required_firstName),
  lastName: yup.string().required(AppError.Required_lastName),
  email: yup
    .string()
    .email(AppError.Wrong_email)
    .required(AppError.Required_email),
  password: yup
    .string()
    .min(6, AppError.Min_length_password)
    .required(AppError.Required_password)
    .matches(
      /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!@#$%&?]{6,20}$/,
      AppError.Wrong_password,
    ),
  passwordRepeat: yup
    .string()
    .oneOf(
      [yup.ref('password'), undefined],
      AppError.WRONG_PASSWORD_DO_NOT_MATCH,
    )
    .required(AppError.Required_password)
    .matches(
      /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!@#$%&?]{6,20}$/,
      AppError.Wrong_password,
    ),
});

import {
  AccentTextForLink,
  ErrorMessage,
  RegisterInput,
  RegisterLabel,
  RegisterText,
  RegisterTitle,
  TextForLink,
  WrapperRegisterInputs,
  WrapperTextForLink,
} from '../Register/styled';
import { IPropsLogin } from '../../../common/types/auth';
import { FC } from 'react';

const Login: FC<IPropsLogin> = (props: IPropsLogin): JSX.Element => {
  const { navigate, register, errors } = props;

  return (
    <>
      <RegisterTitle>Authorization</RegisterTitle>
      <RegisterText>
        Welcome! Please enter your credentials to login to the platform:
      </RegisterText>
      <WrapperRegisterInputs>
        <RegisterLabel>
          Email
          <RegisterInput
            type="email"
            placeholder="Email"
            {...register('email')}
          />
          {errors.email?.message && (
            <ErrorMessage>{String(errors.email.message)}</ErrorMessage>
          )}
        </RegisterLabel>
        <RegisterLabel>
          Password
          <RegisterInput
            type="password"
            placeholder="Password"
            {...register('password')}
          />
          {errors.password?.message && (
            <ErrorMessage>{String(errors.password.message)}</ErrorMessage>
          )}
        </RegisterLabel>
      </WrapperRegisterInputs>
      <button type="submit">Login</button>
      <WrapperTextForLink>
        <TextForLink>
          Don’t have an account?{' '}
          <AccentTextForLink onClick={() => navigate('/register')}>
            Register{' '}
          </AccentTextForLink>
        </TextForLink>
      </WrapperTextForLink>
    </>
  );
};

export default Login;

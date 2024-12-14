import { FC } from 'react';
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
} from './styled';
import { IPropsRegister } from '../../../common/types/auth';
import { GoogleLoginComponent } from '../../../components/GoogleLoginComponent';

const Register: FC<IPropsRegister> = (props: IPropsRegister): JSX.Element => {
  const {  navigate, register, errors } = props;
  return (
    <>
      <RegisterTitle>Registration</RegisterTitle>
      <RegisterText>
        Thank you for your interest in our website! Please, enter data for
        registration:
      </RegisterText>
      <WrapperRegisterInputs>
        <RegisterLabel>
          First Name
          <RegisterInput
            type="text"
            placeholder="First Name"
            {...register('firstName')}
          />
          {errors.firstName?.message && (
            <ErrorMessage>{String(errors.firstName.message)}</ErrorMessage>
          )}
        </RegisterLabel>
        <RegisterLabel>
          Last Name
          <RegisterInput
            type="text"
            placeholder="Last Name"
            {...register('lastName')}
          />
            {errors.lastName?.message && (
            <ErrorMessage>{String(errors.lastName.message)}</ErrorMessage>
          )}
        </RegisterLabel>
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
        <RegisterLabel>
          Confirm password
          <RegisterInput
            type="password"
            placeholder="Confirm password"
            {...register('passwordRepeat')}
          />
            {errors.passwordRepeat?.message && (
            <ErrorMessage>{String(errors.passwordRepeat.message)}</ErrorMessage>
          )}
        </RegisterLabel>
      </WrapperRegisterInputs>
      <button type="submit">Register</button>
      <WrapperTextForLink>
        <div>
          <h3>Register from Google</h3>
          <GoogleLoginComponent />
        </div>
        <TextForLink>
          Already have an account?{' '}
          <AccentTextForLink onClick={() => navigate('/login')}>
            {' '}
            Login
          </AccentTextForLink>
        </TextForLink>
      </WrapperTextForLink>
    </>
  );
};

export default Register;

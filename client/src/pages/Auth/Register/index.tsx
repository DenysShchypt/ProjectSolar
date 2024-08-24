import { FC } from 'react';
import {
  AccentTextForLink,
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
  const {
    setFirstName,
    setLastName,
    setEmail,
    setPassword,
    setPasswordRepeat,
  } = props;
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
            onChange={(e) => setFirstName(e.target.value)}
          />
        </RegisterLabel>
        <RegisterLabel>
          Last Name
          <RegisterInput
            type="text"
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
          />
        </RegisterLabel>
        <RegisterLabel>
          Email
          <RegisterInput
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </RegisterLabel>
        <RegisterLabel>
          Password
          <RegisterInput
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </RegisterLabel>
        <RegisterLabel>
          Confirm password
          <RegisterInput
            type="password"
            placeholder="Confirm password"
            onChange={(e) => setPasswordRepeat(e.target.value)}
          />
        </RegisterLabel>
      </WrapperRegisterInputs>
      <button type="submit">Register</button>
      <WrapperTextForLink>
        <div>
        <h3>Register from Google</h3>
      <GoogleLoginComponent/>
      </div>
        <TextForLink>
          Already have an account?{' '}
          <AccentTextForLink to="/login"> Login</AccentTextForLink>
        </TextForLink>
      </WrapperTextForLink>
    </>
  );
};

export default Register;

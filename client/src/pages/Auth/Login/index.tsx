import {
  AccentTextForLink,
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
  const { setEmail, setPassword, navigate } = props;

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
      </WrapperRegisterInputs>
      <button type="submit">Login</button>
      <WrapperTextForLink>
        <TextForLink>
          Don’t have an account?{' '}
          <AccentTextForLink onClick={()=>navigate("/register")}>Register </AccentTextForLink>
        </TextForLink>
      </WrapperTextForLink>
    </>
  );
};

export default Login;

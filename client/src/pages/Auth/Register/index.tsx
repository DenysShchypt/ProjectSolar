import { FC } from "react";
import {
    AccentTextForLink,
    RegisterInput,
    RegisterLabel,
    RegisterText,
    RegisterTitle,
    TextForLink,
    WrapperRegisterInputs,
    WrapperTextForLink,
} from "./styled";

const Register: FC = (): JSX.Element => {
    return (
        <>
            <RegisterTitle>Registration</RegisterTitle>
            <RegisterText>
                Thank you for your interest in our website! Please, enter data for registration:
            </RegisterText>
            <WrapperRegisterInputs>
                <RegisterLabel>
                    Username
                    <RegisterInput type="text" placeholder="Name" />
                </RegisterLabel>
                <RegisterLabel>
                    Email
                    <RegisterInput type="email" placeholder="Email" />
                </RegisterLabel>
                <RegisterLabel>
                    Password
                    <RegisterInput type="password" placeholder="Password" />
                </RegisterLabel>
                <RegisterLabel>
                    Confirm password
                    <RegisterInput
                        type="password"
                        placeholder="Confirm password"
                    />
                </RegisterLabel>
            </WrapperRegisterInputs>
            <button type="submit">Register</button>
            <WrapperTextForLink>
                <TextForLink>
                    Already have an account?{" "}
                    <AccentTextForLink to="/login"> Login</AccentTextForLink>
                </TextForLink>
            </WrapperTextForLink>
        </>
    );
};

export default Register;

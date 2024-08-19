import { useLocation } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import { AuthContainer, AuthWrapper } from "./styled";
import React from "react";
import { instance } from "../../utils/axios";

const AuthRootComponent = () => {
    const location = useLocation();
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleSubmit = async (e:{preventDefault:()=>void}) => {
        e.preventDefault();
        const userData = { name, email, password };
        const user = await instance.post("auth/register", userData)
        console.log(user.data);
        
    }
    
    return (
        <AuthContainer>
            <form onSubmit={handleSubmit}>
            <AuthWrapper>
            {location.pathname === "/login" ? <Login /> : <Register />}
            </AuthWrapper>
            </form>
        </AuthContainer>
    )
//   return location.pathname === "/login" ? (
//     <Login />
//   ) : location.pathname === "/register" ? (
//     <Register />
//   ) : null;
};

export default AuthRootComponent;

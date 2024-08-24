import { useLocation, useNavigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import { AuthContainer, AuthWrapper } from './styled';
import { useState } from 'react';
import { FC } from 'react';
import { instance } from '../../utils/axios';
import { useAppDispatch } from '../../utils/hooks';
import { setUser } from '../../store/slice/auth';

const AuthRootComponent: FC = (): JSX.Element => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (location.pathname === '/login') {
      try {
        const userData = { email, password };
      const user = await instance.post('/auth/login', userData);
        await dispatch(setUser(user.data))
        console.log(user.data);
        
       navigate("/")
    
      } catch (e: any) {
        return e.message
      }
    } else {
      if (password === passwordRepeat) {
        const userData = {
          firstName,
          lastName,
          email,
          password,
          passwordRepeat,
        };
        const newUser = await instance.post('/auth/register', userData);
        console.log(newUser);
      } else {
        throw new Error('Your passwords do not match.');
      }
    }
  };

  return (
    <AuthContainer>
      <form onSubmit={handleSubmit}>
        <AuthWrapper>
          {location.pathname === '/login' ? (
            <Login setEmail={setEmail} setPassword={setPassword} />
          ) : (
            <Register
              setFirstName={setFirstName}
              setLastName={setLastName}
              setEmail={setEmail}
              setPassword={setPassword}
              setPasswordRepeat={setPasswordRepeat}
            />
          )}
        </AuthWrapper>
      </form>
    </AuthContainer>
  );
  //   return location.pathname === "/login" ? (
  //     <Login />
  //   ) : location.pathname === "/register" ? (
  //     <Register />
  //   ) : null;
};

export default AuthRootComponent;

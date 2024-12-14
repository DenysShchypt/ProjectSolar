import { useLocation, useNavigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import { AuthContainer, AuthWrapper } from './styled';
import { useState } from 'react';
import { FC } from 'react';
import { instance } from '../../utils/axios';
import { useAppDispatch } from '../../utils/hooks';
import { setUser } from '../../store/slice/auth';
import { AppError } from '../../common/errors';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginSchema, RegisterSchema } from '../../utils/yup';

const AuthRootComponent: FC = (): JSX.Element => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: yupResolver(location.pathname === '/login'? LoginSchema: RegisterSchema ) });

  const handleSubmitForm = async (data: any) => {
    if (location.pathname === '/login') {
      try {
        const userData = {
          email: data.email,
          password: data.password,
        };
        const user = await instance.post('/auth/login', userData);
        await dispatch(setUser(user.data));
        navigate('/');
      } catch (e: any) {
        return e.message;
      }
    } else {
      if (data.password === data.passwordRepeat) {
        try {
          const userData = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password,
          };
          const newUser = await instance.post('/auth/register', userData);
          await dispatch(setUser(newUser.data));
          navigate('/');
        } catch (e: any) {
          return e.message;
        }
      } else {
        throw new Error(AppError.WRONG_PASSWORD_DO_NOT_MATCH);
      }
    }
  };

  return (
    <AuthContainer>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <AuthWrapper>
          {location.pathname === '/login' ? (
            <Login navigate={navigate} register={register} errors={errors} />
          ) : (
            <Register
              navigate={navigate}
              register={register}
              errors={errors}
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

import { NavigateFunction, useNavigate } from 'react-router-dom';
import { CredentialResponse, GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { useAppDispatch } from '../../utils/hooks';


const GoogleLoginComponent: React.FC = (): React.ReactElement => {
  const navigate: NavigateFunction = useNavigate();
  const dispatch = useAppDispatch();
  const handleError = (error: void) => {
    console.error('Login Error:', error);
  };

  const responseGoogle = async (response: CredentialResponse) => {
    await dispatch(
      registerAuthGoogleUsers({ token: response.credential as string }),
    );
    navigate('/');
  };

  return (
    <GoogleOAuthProvider
      clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID as string}
    >
      <GoogleLogin
        onSuccess={responseGoogle}
        onError={(error: void) => {
          handleError(error);
        }}
      />
    </GoogleOAuthProvider>
  );
  
};

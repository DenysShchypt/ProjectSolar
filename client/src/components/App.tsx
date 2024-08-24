import { Route, Routes } from 'react-router-dom';
import AuthRootComponent from '../pages/Auth';
import { GoogleLoginComponent } from "./GoogleLoginComponent";

function App() {
  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Hello team</h1>
      <Routes>
        {/* <Route element={<Layout />}> */}

        <Route path="login" element={<AuthRootComponent />} />
        <Route path="register" element={<AuthRootComponent />} />
        {/* </Route> */}
      </Routes>
      <h1 style={{ textAlign: "center" }}>Hello team!</h1>
      <div>
        <h3>Register from Google</h3>
      <GoogleLoginComponent/>
      </div>
    </>
  );
}

export default App;

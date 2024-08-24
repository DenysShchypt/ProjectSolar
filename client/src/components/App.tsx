import { Route, Routes } from 'react-router-dom';
import AuthRootComponent from '../pages/Auth';
import Home from '../pages/Home';

function App() {
  return (
    <>
      <Routes>
        {/* <Route element={<Layout />}> */}
        {/* <Route element={<PrivateRoute/>}> */}
      <Route path="/" element={<Home />} />
        {/* </Route> */}
        <Route path="login" element={<AuthRootComponent />} />
        <Route path="register" element={<AuthRootComponent />} />
        {/* </Route> */}
      </Routes>
      {/* <h1 style={{ textAlign: "center" }}>Hello team!</h1> */}
      
    </>
  );
}

export default App;

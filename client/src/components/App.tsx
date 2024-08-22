import { Route, Routes } from 'react-router-dom';
import AuthRootComponent from '../pages/Auth';

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
    </>
  );
}

export default App;

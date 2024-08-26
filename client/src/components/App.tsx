import { Route, Routes } from 'react-router-dom';
import AuthRootComponent from '../pages/Auth';
import Home from '../pages/Home';
import PrivateRoute from '../utils/router/privateRoute';
import { LayoutComponent } from './Layout';

function App() {
  return (
    <LayoutComponent>
      <Routes>
        {/* <Route element={<Layout />}> */}
        <Route element={<PrivateRoute/>}>
      <Route path="/" element={<Home />} />
        </Route>
        <Route path="login" element={<AuthRootComponent />} />
        <Route path="register" element={<AuthRootComponent />} />
        {/* </Route> */}
      </Routes>
    </LayoutComponent>
  );
}

export default App;

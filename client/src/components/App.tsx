import { useAppDispatch, useAppSelector } from "../utils/hooks";

function App() {
  const dispatch = useAppDispatch();
  const userEmail = useAppSelector((state) => state.auth.user.firstName);
  return (
    <>
      <h1 style={{ textAlign: "center" }}>{userEmail}</h1>
    </>
  );
}

export default App;

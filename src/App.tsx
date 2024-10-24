import Login from "./components/login/Login";
import UserApp from "./components/UserAuth";
import useAuth from "./hooks/useAuth";

const App = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <UserApp /> : <Login />;
};

export default App;

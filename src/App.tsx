import Login from "./components/login/Login";
import UserApp from "./components/UserAuth";

const App = () => {
  const auth = false;

  return auth ? <UserApp /> : <Login />;
};

export default App;

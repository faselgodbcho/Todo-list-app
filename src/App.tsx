import Login from "./components/login/Login";
import UserApp from "./components/UserAuth";
import useAuth from "./hooks/useAuth";
import useDataContext from "./hooks/useDataContext";
import { auth } from "./config/firebase.config";

const App = () => {
  const { isAuthenticated } = useAuth();
  const { displaySettings } = useDataContext();

  return (
    <div className={`app ${displaySettings && "dim"}`}>
      {isAuthenticated ? <UserApp /> : <Login />}
    </div>
  );
};

export default App;

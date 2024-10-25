import Login from "./components/login/Login";
import UserApp from "./components/UserAuth";
import useAuth from "./hooks/useAuth";
import useDataContext from "./hooks/useDataContext";
import loadingAnimation from "/Loading.gif";

const App = () => {
  const { isAuthenticated, isAuthLoading } = useAuth();
  const { displaySettings } = useDataContext();

  if (isAuthLoading)
    return (
      <div className="app">
        <div className="loading-animation">
          <img src={loadingAnimation} alt="" />
        </div>
      </div>
    );

  return (
    <div className={`app ${displaySettings && "dim"}`}>
      {isAuthenticated ? <UserApp /> : <Login />}
    </div>
  );
};

export default App;

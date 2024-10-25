import { useContext } from "react";
import AuthContext from "../contexts/AuthProvider";
import { AuthData } from "../contexts/AuthProvider";

const useAuth = (): AuthData => {
  return useContext(AuthContext);
};

export default useAuth;

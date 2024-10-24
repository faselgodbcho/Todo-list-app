import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { createContext, ReactNode, useEffect, useState } from "react";
import { auth } from "../config/firebase.config";

export type User = {
  uid: string;
  email: string | null;
};

export type AuthData = {
  user: User | null;
  isAuthenticated: boolean;
  login: (name: string, email: string) => Promise<void>;
  signUp: (name: string, email: string) => Promise<void>;
  logout: () => Promise<void>;
};

const initAuthState: AuthData = {
  user: null,
  isAuthenticated: false,
  login: async () => {},
  logout: async () => {},
  signUp: async () => {},
};

const AuthContext = createContext<AuthData>(initAuthState);

type ChildrenTypes = {
  children?: ReactNode;
};

export const AuthProvider = ({ children }: ChildrenTypes): ReactNode => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({ uid: firebaseUser.uid, email: firebaseUser.email });
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    });
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
    } catch (e) {
      console.error(e);
      if (e instanceof Error) alert(e.message);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await signOut(auth);
    } catch (e) {
      console.error(e);
      if (e instanceof Error) alert(e.message);
    }
  };

  const signUp = async (email: string, password: string): Promise<void> => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
    } catch (e) {
      console.error(e);
      if (e instanceof Error) alert(e.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        signUp,
        isAuthenticated,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

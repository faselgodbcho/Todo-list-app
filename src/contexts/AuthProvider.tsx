import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { createContext, ReactNode, useEffect, useState } from "react";
import { auth, db } from "../config/firebase.config";
import { setDoc, doc } from "firebase/firestore";

export type User = {
  uid: string;
  email: string | null;
};

export type AuthData = {
  user: User | null;
  isAuthenticated: boolean;
  login: (name: string, email: string) => Promise<void>;
  signUp: (username: string, name: string, email: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthLoading: boolean;
};

const initAuthState: AuthData = {
  user: null,
  isAuthenticated: false,
  login: async () => {},
  logout: async () => {},
  signUp: async () => {},
  isAuthLoading: false,
};

const AuthContext = createContext<AuthData>(initAuthState);

type ChildrenTypes = {
  children?: ReactNode;
};

export const AuthProvider = ({ children }: ChildrenTypes): ReactNode => {
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() =>
    auth.currentUser ? true : false
  );
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({ uid: firebaseUser.uid, email: firebaseUser.email });
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }

      setIsAuthLoading(false);
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

  const signUp = async (
    username: string,
    email: string,
    password: string
  ): Promise<void> => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await setDoc(doc(db, "users", userCredentials.user.uid), {
        id: userCredentials.user.uid,
        email: userCredentials.user.email,
        username,
      });

      await setDoc(doc(db, "tasks", userCredentials.user.uid), {
        id: userCredentials.user.uid,
        userTasks: [],
      });
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
        isAuthLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

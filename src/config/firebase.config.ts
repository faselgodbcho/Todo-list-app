import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "todo-list-app-f27ff.firebaseapp.com",
  projectId: "todo-list-app-f27ff",
  storageBucket: "todo-list-app-f27ff.appspot.com",
  messagingSenderId: "487054377254",
  appId: "1:487054377254:web:a71be0491c515f7d8741e7",
};

// init app
const app = initializeApp(firebaseConfig);

// init services
const auth = getAuth(app);

// connect to the local emulators
connectAuthEmulator(auth, "http://127.0.0.1:9099");

// export configurations
export { app, auth };

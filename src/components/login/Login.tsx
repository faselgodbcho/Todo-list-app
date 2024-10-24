import { useState, ChangeEvent, FormEvent } from "react";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [displayLogin, setDisplayLogin] = useState<boolean>(true);

  const { login, logout, signUp } = useAuth();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login(email, password);
  };

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signUp(email, password);
  };

  return (
    <div className="container">
      <h3 className="header-icon">Login or Sign up</h3>

      {displayLogin ? (
        <form className="login-form" onSubmit={handleLogin}>
          <div className="group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              name="email"
              id="email"
              required
            />
          </div>
          <div className="group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              name="password"
              id="password"
              required
            />
          </div>

          <button type="submit">Login</button>

          <div className="separator"></div>

          <button
            type="button"
            onClick={() => setDisplayLogin((prev) => !prev)}
          >
            Sign Up
          </button>
        </form>
      ) : (
        <form className="login-form" onSubmit={handleSignUp}>
          <div className="group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setUsername(e.target.value)
              }
              name="username"
              id="username"
              required
            />
          </div>
          <div className="group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              name="email"
              id="email"
              required
            />
          </div>
          <div className="group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              name="password"
              id="password"
              required
            />
          </div>

          <button type="submit">Sign Up</button>

          <div className="separator"></div>

          <button
            type="button"
            onClick={() => setDisplayLogin((prev) => !prev)}
          >
            Login
          </button>
        </form>
      )}
    </div>
  );
};

export default Login;

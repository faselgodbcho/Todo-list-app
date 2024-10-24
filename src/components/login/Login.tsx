import { useState, ChangeEvent } from "react";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [displayLogin, setDisplayLogin] = useState<boolean>(true);

  return (
    <div className="container">
      <h3 className="header-icon">Login or Sign up</h3>

      {displayLogin ? (
        <form className="login-form">
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
        <form className="login-form">
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

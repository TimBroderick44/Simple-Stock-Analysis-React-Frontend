import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import style from "./Home.module.scss";
import apple from "../../../../assets/apple.png";
import microsoft from "../../../../assets/microsoft.png";
import vs from "../../../../assets/vs.png";
import { useAuth } from "../../../../context/AuthContext";

function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { isLoggedIn, login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      login(data.access_token);
      toast.success("Login successful!");
    } else {
      toast.error("Oops! That's not right. Please try again.");
    }
  };

  return (
    <div className={style.container}>
      <div className={style.welcome}>
        <h1>Where to invest? Apple or Microsoft?</h1>
        <p>
          Apple in one corner, with its sleek design and innovative technology.{" "}
          <br /> Microsoft in the other, with its powerful software and business
          solutions.
          <br /> Who will take it out in the battle of the tech giants?
        </p>
        <p>
          It's the stock battle of the century and we've got front row seats!
        </p>
        <div className={style.img_container}>
          <img src={apple} alt="Apple Logo" className={style.apple_logo} />
          <img src={vs} alt="VS" className={style.vs_logo} />
          <img
            src={microsoft}
            alt="Microsoft Logo"
            className={style.microsoft_logo}
          />
        </div>
      </div>
      <div className={style.login}>
        {isLoggedIn ? (
          <div className={style.successMessage}>
            <h2>
              Successful login. <br /> Click on the tabs above to get started.
            </h2>
          </div>
        ) : (
          <div className={style.loginRequest}>
            <h2>
              Sign in to see <br /> the results:
            </h2>
            <form className={style.form} onSubmit={handleLogin}>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit">Login</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;

import style from "./Home.module.scss";
import apple from "../../../../assets/apple.png";
import microsoft from "../../../../assets/microsoft.png";
import vs from "../../../../assets/vs.png";

function Home() {
  return (
    <div className={style.container}>
      <div className={style.welcome}>
        <h1> Who will win? Apple or Microsoft? </h1>
        <p>
          It's Apple Vs Microsoft! Who will take it out in the battle of the tech giants?
        </p>
        <p>Click on the tabs above to get started!</p>
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
        <div className={style.loginRequest}>
          <h2>Sign in to see <br/> the results:</h2>
          <form className={style.form}>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" />
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Home;

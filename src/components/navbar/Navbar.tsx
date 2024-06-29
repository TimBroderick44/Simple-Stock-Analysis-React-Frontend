import style from "./Navbar.module.scss";

function Navbar() {
  return (
    <div className={style.nav}>
      <h1 className={style.title}> Masamune Stock Analysis and Data </h1>
    </div>
  );
}

export default Navbar;

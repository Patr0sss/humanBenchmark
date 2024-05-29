import { Link } from "react-router-dom";
import styles from "./navBar.module.css";

export default function NavBar() {
  return (
    <nav className={styles.navBar}>
      <Link to="/">
        <div className={styles.appName}>HumanBenchmark</div>
      </Link>
      <Link to="/auth">Register</Link>
    </nav>
  );
}

import { Link } from "react-router-dom";
import styles from "./navBar.module.css";
import { useUserInfo } from "../../contexts/UserContext";

export default function NavBar() {
  const { isUserAuthenticated } = useUserInfo();

  return (
    <nav className={styles.navBar}>
      <Link to="/">
        <div className={styles.appName}>HumanBenchmark</div>
      </Link>
      <div>
        {isUserAuthenticated ? (
          <Link to="/profile">Profile</Link>
        ) : (
          <Link to="/auth">Register</Link>
        )}
      </div>
    </nav>
  );
}

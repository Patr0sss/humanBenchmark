import styles from "./landingPage.module.css";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className={styles.landingPage}>
      <div>LandingPage</div>
      <Link to="/auth">login</Link>
      <Link to="/tests/aim">AIM</Link>
    </div>
  );
}

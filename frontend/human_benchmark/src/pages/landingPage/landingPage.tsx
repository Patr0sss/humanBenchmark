import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div>
      <div>LandingPage</div>
      <Link to="/auth">login</Link>
    </div>
  );
}

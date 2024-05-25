import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/landingPage/landingPage";
import AuthPage from "./pages/authPage/authPage";
import LoginPage from "./pages/authPage/loginPage";
import AimTrainer from "./pages/aimTrainer/aimTrainer";
import NavBar from "./components/navbar/navBar";


function App() {
  const location = useLocation();
  return (
    <div>
      {(location.pathname !== "/auth" && location.pathname !== "/login") ? <NavBar /> : null}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/tests/aim" element={<AimTrainer />} />
      </Routes>
    </div>
  );
}

export default App;

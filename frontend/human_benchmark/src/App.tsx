import { Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/landingPage/landingPage";
import AuthPage from "./pages/authPage/authPage";
import AimTrainer from "./pages/aimTrainer/aimTrainer";
import NavBar from "./components/navbar/navBar";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/tests/aim" element={<AimTrainer />} />
      </Routes>
    </div>
  );
}

export default App;

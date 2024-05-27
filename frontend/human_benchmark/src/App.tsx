import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/landingPage/landingPage";
import AuthPage from "./pages/authPage/authPage";
import LoginPage from "./pages/authPage/loginPage";
import AimTrainer from "./pages/aimTrainer/aimTrainer";
import NavBar from "./components/navbar/navBar";
import SequenceMemory from "./pages/sequenceMemory/sequenceMemory";

function App() {
  const location = useLocation();
  return (
    <div>
      {location.pathname !== "/auth" && location.pathname !== "/login" ? (
        <NavBar />
      ) : null}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/tests/aim" element={<AimTrainer />} />
        <Route path="/tests/sequence" element={<SequenceMemory />} />
      </Routes>
    </div>
  );
}

export default App;

import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/landingPage/landingPage";
import AuthPage from "./pages/authPage/authPage";
import LoginPage from "./pages/authPage/loginPage";
import AimTrainer from "./pages/aimTrainer/aimTrainer";
import NavBar from "./components/navbar/navBar";
import SequenceMemory from "./pages/sequenceMemory/sequenceMemory";
import MemoryGame from "./pages/memoryGame/memoryGame";
import UserDashboardPage from "./pages/userDashboardPage/userDashboardPage";
import SpeedClicker from "./pages/speedClicker/speedClicker";
import TypingGame from "./pages/typingGame/typingGame";
import FindGame from "./pages/findGame/findGame";
import { useEffect } from "react";
import { useUserInfo } from "./contexts/UserContext";

function App() {
  const location = useLocation();
  const { checkUserStatus, isUserAuthenticated } = useUserInfo();
  useEffect(() => {
    checkUserStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [document.cookie]);

  return (
    <div>
      {location.pathname !== "/auth" && location.pathname !== "/login" ? (
        <NavBar />
      ) : null}
      <Routes>
        <Route
          path="/"
          element={
            isUserAuthenticated ? <LandingPage /> : <Navigate to="/auth" />
          }
        />
        <Route
          path="/auth"
          element={isUserAuthenticated ? <Navigate to="/" /> : <AuthPage />}
        />
        <Route
          path="/login"
          element={isUserAuthenticated ? <Navigate to="/" /> : <LoginPage />}
        />
        <Route
          path="/profile"
          element={
            isUserAuthenticated ? (
              <UserDashboardPage />
            ) : (
              <Navigate to="/auth" />
            )
          }
        />
        <Route path="/tests/aim" element={<AimTrainer />} />
        <Route path="/tests/sequence" element={<SequenceMemory />} />
        <Route path="/tests/memory" element={<MemoryGame />} />
        <Route path="/tests/typing" element={<TypingGame />} />
        <Route path="/tests/clicker" element={<SpeedClicker />} />
        <Route path="/tests/find" element={<FindGame />} />
      </Routes>
    </div>
  );
}

export default App;

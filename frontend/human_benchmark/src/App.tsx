import { Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/landingPage/landingPage";
import AuthPage from "./pages/authPage/authPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </div>
  );
}

export default App;

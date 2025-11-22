import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Components/auth/SignUp";
import Signin from "./Components/auth/SignIn";
import LandingPage from "./Pages/Homepage";
import Dashboard from "./Components/auth/dashboard/DashbBoard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Components/auth/SignUp";
import Signin from "./Components/auth/SignIn";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

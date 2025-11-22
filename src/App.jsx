import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Components/auth/SignUp";
import Signin from "./Components/auth/SignIn";
import EmailVerification from "./Components/auth/EmailVerification";

import LandingPage from "./Pages/Homepage";
import Dashboard from "./Components/auth/dashboard/DashbBoard";
import ReceiptsList from "./Pages/receipts/RecieptList";
import StockList from "./Pages/stock/StockList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/receipts" element={<ReceiptsList />} />
        <Route path="/stock" element={<StockList />} />
        <Route path="/verify-email" element={<EmailVerification />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

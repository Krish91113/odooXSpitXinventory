import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Signup from "./Components/auth/SignUp";
import Signin from "./Components/auth/SignIn";
import EmailVerification from "./Components/auth/EmailVerification";
import ForgetPassword from "./Components/auth/ForgetPassword";
import ResetPassword from "./Components/auth/ResetPassword";

import LandingPage from "./Pages/Homepage";
import Dashboard from "./Components/auth/dashboard/DashbBoard";

import ReceiptsList from "./Pages/receipts/RecieptList";
import StockList from "./Pages/stock/StockList";
import MoveHistoryList from "./Pages/moveHistory/MoveHistoryList";
import DeliveryList from "./Pages/delivery/DeliveryList";
import DeliveryForm from "./Pages/delivery/DeliveryForm";
import Settings from "./Pages/settings/Settings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public / Auth routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        {/* adjust this path if your friend used a different one */}
        <Route path="/verify-email" element={<EmailVerification />} />

        {/* Main app routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/receipts" element={<ReceiptsList />} />
        <Route path="/stock" element={<StockList />} />
       <Route path="/move-history" element={<MoveHistoryList />} />
        <Route path="/movehistory" element={<MoveHistoryList />} />
        <Route path="/delivery" element={<DeliveryList />} />
        <Route path="/delivery/new" element={<DeliveryForm />} />
        <Route path="/delivery/:id" element={<DeliveryForm />} />
        <Route path="/delivery/:id/edit" element={<DeliveryForm />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/verify-email" element={<EmailVerification />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Signup from "./Components/auth/SignUp";
import Signin from "./Components/auth/SignIn";
import EmailVerification from "./Components/auth/EmailVerification";
import ForgetPassword from "./Components/auth/ForgetPassword";
import ResetPassword from "./Components/auth/ResetPassword";
import Dashboard from "./pages/Dashboard";

import LandingPage from "./Pages/LandingPage";

import ReceiptsList from "./Pages/receipts/RecieptList";
import StockList from "./Pages/stock/StockList";
import MoveHistoryList from "./Pages/moveHistory/MoveHistoryList";
import DeliveryList from "./Pages/delivery/DeliveryList";
import DeliveryForm from "./Pages/delivery/DeliveryForm";
import Settings from "./Pages/settings/Settings";
import TestFont from "./Pages/Testfont";
import ProtectedRoute from "./Components/ProtectedRoute";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* ---- PUBLIC ROUTES ---- */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-email" element={<EmailVerification />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* ---- PROTECTED ROUTES ---- */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/receipts"
          element={
            <ProtectedRoute>
              <ReceiptsList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/stock"
          element={
            <ProtectedRoute>
              <StockList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/move-history"
          element={
            <ProtectedRoute>
              <MoveHistoryList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/delivery"
          element={
            <ProtectedRoute>
              <DeliveryList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/delivery/new"
          element={
            <ProtectedRoute>
              <DeliveryForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/delivery/:id"
          element={
            <ProtectedRoute>
              <DeliveryForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;


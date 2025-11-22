import { BrowserRouter, Routes, Route } from "react-router-dom";

// Auth Pages
import Signup from "./Components/auth/SignUp";
import Signin from "./Components/auth/SignIn";
import EmailVerification from "./Components/auth/EmailVerification";
import ForgetPassword from "./Components/auth/ForgetPassword";
import ResetPassword from "./Components/auth/ResetPassword";

// Public Landing Page
import LandingPage from "./Pages/LandingPage";

// Protected Pages
import Dashboard from "./pages/Dashboard";
import ReceiptsList from "./Pages/receipts/RecieptList";
import ReceiptForm from "./Pages/receipts/ReceiptForms";
import StockList from "./Pages/stock/StockList";
import MoveHistoryList from "./Pages/moveHistory/MoveHistoryList";
import DeliveryList from "./Pages/delivery/DeliveryList";
import DeliveryForm from "./Pages/delivery/DeliveryForm";
import Settings from "./Pages/settings/Settings";

// Layout + Protection
import ProtectedRoute from "./Components/ProtectedRoute";
import AppLayout from "./Components/layout/AppLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ------------------------- PUBLIC ROUTES --------------------------- */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-email" element={<EmailVerification />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* ------------------------- PROTECTED ROUTES ------------------------ */}
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          {/* Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Receipts */}
          <Route path="/receipts" element={<ReceiptsList />} />
          <Route path="/receipts/new" element={<ReceiptForm />} />
          <Route path="/receipts/:id" element={<ReceiptForm />} />
          <Route path="/receipts/:id/edit" element={<ReceiptForm />} />

          {/* Deliveries */}
          <Route path="/delivery" element={<DeliveryList />} />
          <Route path="/delivery/new" element={<DeliveryForm />} />
          <Route path="/delivery/:id" element={<DeliveryForm />} />

          {/* Stock */}
          <Route path="/stock" element={<StockList />} />

          {/* Stock Movement */}
          <Route path="/move-history" element={<MoveHistoryList />} />

          {/* Settings */}
          <Route path="/settings" element={<Settings />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;

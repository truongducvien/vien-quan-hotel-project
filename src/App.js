import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import PaymentPage from "./components/payment-page/PaymentPage";
import MainBooking from "./components/main-booking/MainBooking";
import UserLogin from "./components/user-login-register/UserLogin";
import UserRegister from "./components/user-login-register/UserRegister";
import { ProtectedRoute } from "./components/ProtectedRoute";
import HomePage from "./components/home/HomePage";
import { DataProvider } from "./providers/DataContext";

function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<UserLogin />} />
            <Route path="/register" element={<UserRegister />} />
            <Route path="/booking" element={<MainBooking />} />
            <Route
              path="/payment"
              element={
                <ProtectedRoute>
                  <PaymentPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;

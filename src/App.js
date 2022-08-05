import { BrowserRouter, Routes, Route, Pro } from "react-router-dom";
import "./App.css";
import MainBooking from "./components/main-booking/MainBooking";
import UserLogin from "./components/user-login-register/UserLogin";
import UserRegister from "./components/user-login-register/UserRegister";
import { ProtectedRoute } from "./components/ProtectedRoute";
import HomePage from "./components/home/HomePage";
import { DataProvider } from "./providers/DataContext";
import AdminPage from "./admin-src/components/main-layout/HomePage";
import PaymentPage from "./components/payment-page/PaymentPage";
import { BookingHistory } from "./components/booking-history/BookingHistory";
import { ProtectedRouteAdmin } from "./components/ProtectedRouteAdmin";

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
              path="/bookinghistory"
              element={
                <ProtectedRoute>
                  <BookingHistory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/payment"
              element={
                <ProtectedRoute>
                  <PaymentPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/*"
              element={
                <ProtectedRouteAdmin>
                  <AdminPage />
                </ProtectedRouteAdmin>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;

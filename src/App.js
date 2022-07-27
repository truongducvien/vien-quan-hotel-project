import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import MainBooking from "./components/main-booking/MainBooking";
import UserLogin from "./components/user-login-register/UserLogin";
import UserRegister from "./components/user-login-register/UserRegister";
import { ProtectedRoute } from "./components/ProtectedRoute";
import HomePage from "./components/home/HomePage";
import { DataProvider } from "./providers/DataContext";
import { AppLayout } from "./layout/app-layout/AppLayout";
import { PaymentBooking } from "./components/payment-page/payment-booking/PaymentBooking";
import { BookingReport } from "./components/booking-report/BookingReport";
import { RoomPagination } from "./components/room-pagination/RoomPagination";

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
            {/* <Route path="/bookingreport" element={<BookingReport />} /> */}
            <Route
              path="/bookingreport"
              element={
                <ProtectedRoute>
                  <BookingReport />
                </ProtectedRoute>
              }
            />
            <Route
              path={"roompagination/:params"}
              element={<RoomPagination />}
            />
            <Route path="/roompagination" element={<RoomPagination />} />
            <Route
              path="/payment"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <PaymentBooking />
                  </AppLayout>
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

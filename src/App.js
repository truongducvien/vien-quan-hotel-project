import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./components/HomePage";
import PaymentPage from "./components/payment-page/PaymentPage";
import MainBooking from "./components/main-booking/MainBooking";
import { CustomerContext } from "./providers/CustomerContext";
import { v4 } from "uuid";
import UserLogin from "./components/user-login-register/UserLogin";
import UserRegister from "./components/user-login-register/UserRegister";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  const [availableRooms, setAvailableRooms] = useState([]);

  const [options, setOptions] = useState([
    {
      id: v4(),
      adult: 2,
      children: 0,
      roomId: 0,
      roomName: "",
      roomPrice: 0,
    },
  ]);

  const today = Date.now();
  const tomorrow = today + 24 * 60 * 60 * 1000;

  const [orderInfo, setOrderInfo] = useState({
    userInfo: {},
    date: { startDay: today, endDay: tomorrow },
    nights: 1,
    options: options,
  });

  useEffect(() => {
    const userInfoStorage = localStorage.getItem("USER_INFO");
    if (userInfoStorage === null) {
      return;
    } else {
      setOrderInfo({ ...orderInfo, userInfo: JSON.parse(userInfoStorage) });
    }
    localStorage.setItem("ORDER_INFO", JSON.stringify(orderInfo));
  }, []);

  useEffect(() => {
    const storedCustomer = localStorage.getItem("ORDER_INFO");

    if (storedCustomer === null) {
      localStorage.setItem("ORDER_INFO", JSON.stringify(orderInfo));
    }
    setOrderInfo(JSON.parse(storedCustomer));
  }, []);

  return (
    <CustomerContext.Provider
      value={{
        orderInfo,
        setOrderInfo,
        options,
        setOptions,
        availableRooms,
        setAvailableRooms,
      }}
    >
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
    </CustomerContext.Provider>
  );
}

export default App;

import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./components/HomePage";
import PaymentPage from "./components/payment-page/PaymentPage";
import MainBooking from "./components/main-booking/MainBooking";
import { CustomerContext } from "./providers/CustomerContext";
import { v4 } from "uuid";
import moment from "moment";
import UserLogin from "./components/user-login-register/UserLogin";
import UserRegister from "./components/user-login-register/UserRegister";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  const [options, setOptions] = useState([
    {
      id: v4(),
      adult: 1,
      children: 0,
      roomName: "",
      roomPrice: 0,
    },
  ]);
  const [customerBook, setCustomerBook] = useState({
    date: {
      startDay: moment(new Date()).format("ddd, DD MMM YY"),
      endDay: moment(
        new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
      ).format("ddd, DD MMM YY"),
    },
    nights: 1,
    roomNum: 1,
    options: options,
  });

  useEffect(() => {
    const storedCustomer = localStorage.getItem("CUSTOMER-HOTEL");
    if (storedCustomer === null) {
      localStorage.setItem(
        "CUSTOMER-HOTEL",
        JSON.stringify({
          date: {
            startDay: moment(new Date()).format("ddd, DD MMM YY"),
            endDay: moment(
              new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
            ).format("ddd, DD MMM YY"),
          },
          nights: 1,
          roomNum: 1,
          options: options,
        })
      );
    }
    setCustomerBook(JSON.parse(storedCustomer));
  }, []);

  return (
    <CustomerContext.Provider
      value={{
        customerBook,
        setCustomerBook,
        options,
        setOptions,
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

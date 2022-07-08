import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./components/HomePage";
import PaymentPage from "./components/payment-page/PaymentPage";
import MainBooking from "./components/main-booking/MainBooking";
import UserRegisterLogin from "./components/user-login-register/UserRegisterLogin";
import { CustomerContext } from "./providers/CustomerContext";
import { v4 } from "uuid";
function App() {
  const [options, setOptions] = useState([
    {
      id: v4(),
      adult: 2,
      children: 0,
      roomName: "",
      roomPrice: 0,
    },
  ]);
  const [customerBook, setCustomerBook] = useState({
    date: {
      startDay: new Date().toLocaleDateString("en-us", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      endDay: new Date().toLocaleDateString("en-us", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    },
    nights: 0,
    roomNum: 1,
    options: options,
  });

  // useEffect(() => {
  //   const nights = Math.floor(
  //     (customerBook.date.endDay - customerBook.date.startDay) /
  //       (24 * 60 * 60 * 1000)
  //   );
  //   console.log("nights start:", nights);
  // }, [customerBook]);

  // useEffect(() => {
  //   const storedCustomer = localStorage.getItem("CUSTOMER-HOTEL");
  //   if (storedCustomer === null) {
  //     setCustomerBook({
  //       date: { startDay: "", endDay: "" },
  //       nights: 0,
  //       roomNum: 1,
  //       options: options,
  //     });
  //     return;
  //   }
  //   setCustomerBook(JSON.parse(storedCustomer));
  // }, []);

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
            <Route path="/login-register" element={<UserRegisterLogin />} />
            <Route path="/booking" element={<MainBooking />} />
            <Route path="/payment" element={<PaymentPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </CustomerContext.Provider>
  );
}

export default App;

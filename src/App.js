import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./components/HomePage";
import PaymentPage from "./components/payment-page/PaymentPage";
import MainBooking from "./components/main-booking/MainBooking";
import UserRegisterLogin from "./components/user-login-register/UserRegisterLogin";
import { CustomerContext } from "./providers/CustomerContext";
import { v4 } from "uuid";
import moment from "moment";
import UserLogin from "./components/user-login-register/UserLogin";
import UserRegister from "./components/user-login-register/UserRegister";

function App() {
  const [usersData, setUsersData] = useState([]);
  const [userLogin, setUserLogin] = useState({});

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

    let userLocalStorage = localStorage.getItem("USERS-DATA");
    if (userLocalStorage === null) {
      return;
    }
    setUsersData(JSON.parse(userLocalStorage));

    let loginLocalStorage = localStorage.getItem("USERS-LOGIN");
    if (loginLocalStorage === null) {
      return;
    }
    setUserLogin(JSON.parse(loginLocalStorage));
  }, []);

  return (
    <CustomerContext.Provider
      value={{
        customerBook,
        setCustomerBook,
        options,
        setOptions,
        usersData,
        setUsersData,
        userLogin,
        setUserLogin,
      }}
    >
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<UserLogin />} />
            <Route path="/register" element={<UserRegister />} />
            <Route path="/booking" element={<MainBooking />} />
            <Route path="/payment" element={<PaymentPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </CustomerContext.Provider>
  );
}

export default App;

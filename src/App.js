import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./components/HomePage";
import PaymentPage from "./components/payment-page/PaymentPage";
import MainBooking from "./components/main-booking/MainBooking";
import UserRegisterLogin from "./components/user-login-register/UserRegisterLogin";
import { CustomerContext } from "./providers/CustomerContext";

function App() {
  const [customer, setCustomer] = useState({});

  useEffect(() => {
    const storedCustomer = localStorage.getItem("CUSTOMER-HOTEL");
    if (storedCustomer === null) {
      setCustomer({});
      return;
    }
    setCustomer(JSON.parse(storedCustomer));
  }, []);

  return (
    <CustomerContext.Provider value={{ customer, setCustomer }}>
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

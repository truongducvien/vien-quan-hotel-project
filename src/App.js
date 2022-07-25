import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import PaymentPage from "./components/payment-page/PaymentPage";
import MainBooking from "./components/main-booking/MainBooking";
import { CustomerContext } from "./providers/CustomerContext";
import { v4 } from "uuid";
import UserLogin from "./components/user-login-register/UserLogin";
import UserRegister from "./components/user-login-register/UserRegister";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { timeEndDay, timeStartDay } from "./utils";
import HomePage from "./components/home/HomePage";

function App() {
  const [availableRooms, setAvailableRooms] = useState([]);
  const [objQtyTypeId, setObjQtyTypeId] = useState({});
  const [soldOutId, setSoldOutId] = useState([]);
  const [promoCode, setPromoCode] = useState({
    codeName: "",
    value: 0,
    description: "",
    id: 0,
  });

  const [options, setOptions] = useState([
    {
      id: v4(),
      adult: 2,
      children: 0,
      typeRoomId: 0,
      typeRoom: "",
      roomPrice: 0,
      roomName: "",
      maxPerson: 6,
    },
  ]);
  const [userLoginId, setUserLoginId] = useState(0);

  const today = Date.now();
  const tomorrow = today + 24 * 60 * 60 * 1000;

  const [orderInfo, setOrderInfo] = useState({
    userInfo: {},
    date: {
      startDay: timeStartDay(today),
      endDay: timeEndDay(tomorrow),
    },
    nights: 1,
    options: [
      {
        id: v4(),
        adult: 2,
        children: 0,
        typeRoomId: 0,
        typeRoom: "",
        roomPrice: 0,
        roomName: "",
        maxPerson: 6,
      },
    ],
    payment: {
      method: "",
      payInfo: {
        cardNumber: "",
        nameOnCard: "",
      },
    },
  });

  const [currentPay, setCurrentPay] = useState(0);

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
        objQtyTypeId,
        setObjQtyTypeId,
        currentPay,
        setCurrentPay,
        userLoginId,
        setUserLoginId,
        soldOutId,
        setSoldOutId,
        promoCode,
        setPromoCode,
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

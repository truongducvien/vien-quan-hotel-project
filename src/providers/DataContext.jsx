import React, { useState, useEffect } from "react";
import { timeEndDay, timeStartDay } from "../utils";
import { v4 } from "uuid";
import { CustomerContext } from "./CustomerContext";

export const DataProvider = ({ children }) => {
  const today = Date.now();
  const tomorrow = today + 24 * 60 * 60 * 1000;
  const [dates, setDates] = useState({
    startDay: timeStartDay(today),
    endDay: timeEndDay(tomorrow),
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
      maxPerson: 10,
      status: "Booked",
    },
  ]);

  const [orderInfo, setOrderInfo] = useState({
    id: v4(),
    userInfo: {},
    date: dates,
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
        maxPerson: 10,
        status: "Booked",
      },
    ],
    status: "Booked",
    payment: {
      method: "",
      payInfo: {
        cardNumber: "",
        nameOnCard: "",
      },
    },
  });

  useEffect(() => {
    const storedCustomer = localStorage.getItem("ORDER_INFO");

    if (storedCustomer === null) {
      localStorage.setItem("ORDER_INFO", JSON.stringify(orderInfo));
    }
    setOrderInfo(JSON.parse(storedCustomer));
  }, []);

  const [userLoginId, setUserLoginId] = useState(0);
  useEffect(() => {
    let userLoginStorage = localStorage.getItem("USER_INFO");
    if (userLoginStorage !== null) {
      let userLoginAccount = JSON.parse(userLoginStorage);
      setUserLoginId(userLoginAccount.id);
    }
  }, [localStorage.getItem("USER_INFO")]);
  const [availableRooms, setAvailableRooms] = useState([]);
  const [soldOutId, setSoldOutId] = useState([]);
  const [objQtyTypeId, setObjQtyTypeId] = useState({});

  const [promoCode, setPromoCode] = useState({
    codeName: "",
    value: 0,
    description: "",
    id: 0,
  });

  const [currentPay, setCurrentPay] = useState(0);
  const [bookingInfo, setBookingInfo] = useState(null);

  return (
    <CustomerContext.Provider
      value={{
        dates,
        setDates,
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
        bookingInfo,
        setBookingInfo,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};

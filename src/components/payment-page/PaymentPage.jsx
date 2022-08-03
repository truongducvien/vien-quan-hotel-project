import React, { useState } from "react";
import "./style/payment-page.scss";
import "antd/dist/antd.css";
import { Navigate } from "react-router";
import { useDispatch } from "react-redux";
import { logoutAction } from "../../stores/slices/user.slice";
import { useEffect } from "react";
import { PaymentBooking } from "./payment-booking/PaymentBooking";
import { PayHeader } from "./PayHeader";

function PaymentPage() {
  const [account, setAccount] = useState({});
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(logoutAction());
  };

  useEffect(() => {
    const userInfoStorage = localStorage.getItem("USER_INFO");
    if (userInfoStorage === null) {
      return <Navigate to={"/booking"} />;
    }
    setAccount(JSON.parse(userInfoStorage));
  }, [localStorage.getItem("USER_INFO")]);

  return (
    <div className="payment-page">
      <PayHeader />
      <PaymentBooking />
    </div>
  );
}

export default PaymentPage;

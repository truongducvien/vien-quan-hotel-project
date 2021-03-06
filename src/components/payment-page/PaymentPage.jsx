import React from "react";
import "./style/payment-page.scss";
import "antd/dist/antd.css";
import { Row, Col } from "antd";
import { Navigate } from "react-router";
import { Link } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { logoutAction } from "../../stores/slices/UserSlice";
import { useEffect } from "react";
import { PaymentBooking } from "./payment-booking/PaymentBooking";

function PaymentPage() {
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(logoutAction());
  };

  useEffect(() => {
    if (localStorage.getItem("USER_INFO") === null) {
      return <Navigate to={"/booking"} />;
    }
  }, [localStorage.getItem("USER_INFO")]);

  return (
    <div className="payment-page">
      <div className="pay-header">
        <Row justify="center">
          <Col xs={2} sm={2} md={1} lg={1}>
            <Link to="/booking">
              <ArrowLeftOutlined />
            </Link>
          </Col>
          <Col xs={9} sm={7} md={6} lg={4} className="text-logo">
            <Link to="/">
              <p>Ocean Villa </p>
            </Link>
          </Col>

          <Col xs={2} sm={6} md={8} lg={10}></Col>
          <Col xs={2} sm={2} md={3} lg={2}>
            <button className="pay-btn-logout" onClick={handleLogOut}>
              Logout
            </button>
          </Col>
          <Col xs={1} sm={1} md={1} lg={1}></Col>
        </Row>
      </div>

      <PaymentBooking />
    </div>
  );
}

export default PaymentPage;

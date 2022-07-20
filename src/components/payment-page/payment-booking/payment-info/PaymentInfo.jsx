import React from "react";
import { Col, Row } from "antd";
import PayBookingView from "../../pay-booking-view/PayBookingView";
import PayMethodSection from "./PayMethodSection";

export const PaymentInfo = () => {
  return (
    <div className="pay-main">
      <Row className="pay-wrapper">
        <Col className="pay-form" xs={24} sm={24} md={14} xl={15}>
          <PayMethodSection />
        </Col>
        <Col className="pay-booking-view" xs={24} sm={24} md={10} xl={9}>
          <PayBookingView />
        </Col>
      </Row>
    </div>
  );
};

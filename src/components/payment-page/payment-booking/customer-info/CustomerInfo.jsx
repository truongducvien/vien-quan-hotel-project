import { Col, Row } from "antd";
import React from "react";
import PayBookingView from "../../pay-booking-view/PayBookingView";
import FormContact from "./FormContact";

export const CustomerInfo = () => {
  return (
    <div className="pay-main">
      <Row className="pay-wrapper">
        <Col className="pay-form" xs={24} sm={24} md={14} xl={15}>
          <FormContact />
        </Col>
        <Col className="pay-booking-view" xs={24} sm={24} md={10} xl={9}>
          <PayBookingView />
        </Col>
      </Row>
    </div>
  );
};

import React from "react";
import { Col, Row } from "antd";
import BookingSection from "./BookingSection";
import PayBookingView from "../../pay-booking-view/PayBookingView";

export const ConfirmBooking = () => {
  return (
    <div className="pay-main">
      <Row className="pay-wrapper">
        <Col className="pay-form" xs={24} sm={24} md={14} xl={15}>
          <BookingSection />
        </Col>
        <Col className="pay-booking-view" xs={24} sm={24} md={10} xl={9}>
          <PayBookingView />
        </Col>
      </Row>
    </div>
  );
};

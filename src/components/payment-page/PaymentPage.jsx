import React from "react";
import "./payment-page.css";
import "antd/dist/antd.css";
import { Row, Col } from "antd";
import PayBookingView from "./pay-booking-view/PayBookingView";
// import DemoForm from "./pay-form-contact/demoForm";
import PayFormContact from "./pay-form-contact/PayFormContact";

function PaymentPage() {
  return (
    <div>
      <div>Header</div>
      <div className="pay-main">
        <Row className="pay-wrapper">
          <Col className="pay-form" xs={24} sm={24} md={14} xl={15}>
            {/* <DemoForm /> */}
            <PayFormContact />
          </Col>
          <Col className="pay-booking-view" xs={24} sm={24} md={10} xl={9}>
            <PayBookingView />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default PaymentPage;

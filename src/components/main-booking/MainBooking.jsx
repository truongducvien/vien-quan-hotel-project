import React from "react";
import "./style/main-booking.css";

import "antd/dist/antd.css";
import { Row, Col } from "antd";
import BookingView from "./booking-view/BookingView";
import RoomList from "./room-list/RoomList";

function MainBooking() {
  return (
    <main className="main-container">
      <Row className="room-booking">
        <Col className="room-booking" xs={24} sm={24} md={16} xl={16}>
          <RoomList />
        </Col>
        <Col className="booking-view" xs={24} sm={24} md={8} xl={8}>
          <BookingView />
        </Col>
      </Row>
    </main>
  );
}

export default MainBooking;

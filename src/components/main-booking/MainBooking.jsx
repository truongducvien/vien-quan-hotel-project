import React from "react";
import "./style/main-booking.css";

import "antd/dist/antd.css";
import { Row, Col } from "antd";
import BookingView from "./booking-view/BookingView";
import RoomList from "./room-list/RoomList";
import BookHeader from "./BookHeader";
import BookSearchbar from "./BookSearchbar";

function MainBooking() {
  return (
    <div>
      <main className="main-container">
        <BookHeader />
        <BookSearchbar />

        <Row className="room-booking">
          <Col className="room-list" xs={24} sm={24} md={14} xl={16}>
            <RoomList />
          </Col>
          <Col className="booking-view" xs={24} sm={24} md={10} xl={8}>
            <BookingView />
          </Col>
        </Row>
      </main>
    </div>
  );
}

export default MainBooking;

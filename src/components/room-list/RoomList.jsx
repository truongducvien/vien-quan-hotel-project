import React from "react";
import "./room-list.css";

import "antd/dist/antd.css";
import { Row, Col } from "antd";
import RoomType from "./RoomType";
import RoomRateList from "./RoomRateList";
import { DataRoomsDemo } from "../../stores/data-demo";
import BookingView from "../booking-view/BookingView";
import RoomSoldOut from "./RoomSoldOut";

function RoomList() {
  return (
    <main className="main-container">
      <Row className="room-booking">
        <Col className="room-booking" xs={24} sm={24} md={16} xl={16}>
          <div className="rooms">
            {DataRoomsDemo.map((room) => (
              <div key={room.id} className="room">
                <RoomType room={room} />
                <RoomRateList room={room} />
                <RoomRateList room={room} />
                <RoomSoldOut room={room} />
              </div>
            ))}
          </div>
        </Col>
        <Col className="booking-view" xs={24} sm={24} md={8} xl={8}>
          <BookingView />
        </Col>
      </Row>
    </main>
  );
}

export default RoomList;

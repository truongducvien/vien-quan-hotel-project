import React from "react";
import { Row, Col } from "antd";

function RoomRateList({ room }) {
  return (
    <div className="room-rate-list">
      <div className="room-rate-name">{room?.rateList.nameRate}</div>
      <Row>
        <Col className="rate-inclusions" xs={24} sm={11} md={11} xl={13}>
          <div>
            <p>
              {room.iconCancelRate}
              {room?.rateList.refundable}
            </p>
            <p>
              {room.iconCancelRate}
              {room?.rateList.payTimes}
            </p>
          </div>
        </Col>
        <Col xs={24} sm={13} md={13} xl={11}>
          <Row className="rate-price-select">
            <Col xs={24} sm={16} md={16} xl={16}>
              <p style={{ fontWeight: 700 }}>VND 3,673,214.72 </p>
              <p>2guests, 1 night</p>
            </Col>
            <Col sx={24} sm={8} md={8} xl={8}>
              <div>
                <button className="rate-select-btn">Select</button>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default RoomRateList;

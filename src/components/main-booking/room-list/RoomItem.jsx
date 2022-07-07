import React from "react";
import { Row, Col } from "antd";
import ImageCarousel from "./ImageCarousel";
import RoomInfo from "./RoomInfo";
import * as RiIcons from "react-icons/ri";

function RoomItem({ room }) {
  const handleSelect = () => {
    console.log(room);
  };

  return (
    <div>
      <div className="room-type">
        <Row>
          <Col className="room-type-carousel" xs={24} sm={24} md={24} xl={10}>
            <ImageCarousel room={room} />
          </Col>
          <Col className="room-type-intro" xs={24} sm={24} md={24} xl={14}>
            <RoomInfo room={room} />
          </Col>
        </Row>
      </div>
      <div className="room-rate-list">
        <Row>
          <Col className="rate-inclusions" xs={24} sm={11} md={11} xl={13}>
            <div>
              <p>
                <RiIcons.RiErrorWarningLine />
              </p>
              <p>
                <RiIcons.RiErrorWarningLine />
              </p>
            </div>
          </Col>
          <Col xs={24} sm={13} md={13} xl={11}>
            {room.quantity !== 0 ? (
              <Row className="rate-price-select">
                <Col xs={24} sm={16} md={16} xl={16}>
                  <p style={{ fontWeight: 700 }}>VND 3,673,214.72 </p>
                  <p>2guests, 1 night</p>
                </Col>

                <Col sx={24} sm={8} md={8} xl={8}>
                  <div>
                    <button onClick={handleSelect} className="rate-select-btn">
                      Select
                    </button>
                  </div>
                </Col>
              </Row>
            ) : (
              <div>
                <div className="sold-out">Sold out</div>
              </div>
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default RoomItem;

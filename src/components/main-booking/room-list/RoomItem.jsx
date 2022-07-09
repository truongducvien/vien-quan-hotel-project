import React, { useContext, useEffect } from "react";
import { Row, Col } from "antd";
import RoomInfo from "./RoomInfo";
import * as RiIcons from "react-icons/ri";
import { CustomerContext } from "../../../providers/CustomerContext";
import ImageCarouselSwiper from "./ImageCarouselSwiper";

function RoomItem({ room, idOption }) {
  const { customerBook, setCustomerBook, options, setOptions } =
    useContext(CustomerContext);

  let roomPriceString = String(room.price).replace(/(.)(?=(\d{3})+$)/g, "$1,");

  useEffect(() => {
    setCustomerBook({ ...customerBook, options });
    localStorage.setItem("CUSTOMER-HOTEL", JSON.stringify(customerBook));
    // console.log("customerBook Room", customerBook);
  }, [options]);

  const handleSelect = (room) => {
    if (customerBook.nights === 0) {
      alert("Please select the dates");
      return;
    }

    const newOptions = options.map((option) => {
      if (option.id === idOption) {
        return { ...option, roomName: room.nameRoom, roomPrice: room.price };
      }
      return option;
    });
    setOptions(newOptions);

    setCustomerBook({ ...customerBook, options });
  };

  return (
    <div>
      <div className="room-type">
        <Row>
          <Col className="room-type-carousel" xs={24} sm={24} md={24} xl={10}>
            <ImageCarouselSwiper room={room} />
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
                  <p style={{ fontWeight: 700 }}>VND {roomPriceString} </p>
                  <p>2guests, 1 night</p>
                </Col>

                <Col sx={24} sm={8} md={8} xl={8}>
                  <div>
                    <button
                      type="button"
                      onClick={() => handleSelect(room)}
                      className="rate-select-btn"
                    >
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

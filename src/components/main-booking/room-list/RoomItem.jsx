import React, { useContext, useEffect, useState } from "react";
import { Row, Col } from "antd";
import { v4 } from "uuid";
import RoomInfo from "./RoomInfo";
import { CustomerContext } from "../../../providers/CustomerContext";
import ImageCarouselSwiper from "./ImageCarouselSwiper";

function RoomItem({ room, option }) {
  const {
    orderInfo,
    setOrderInfo,
    options,
    setOptions,
    objQtyTypeId,
    setObjQtyTypeId,
    soldOutId,
    setSoldOutId,
    hideSoldOut,
    setHideSoldOut,
  } = useContext(CustomerContext);
  const [findExitId, setFindExitId] = useState(true);

  let roomPriceString = String(room.price).replace(/(.)(?=(\d{3})+$)/g, "$1,");
  let sumGuest = option.adult + option.children;

  useEffect(() => {
    setOrderInfo({ ...orderInfo, options: options });
    localStorage.setItem("ORDER_INFO", JSON.stringify(orderInfo));
  }, [options]);

  const handleSelect = (room) => {
    const newOptions = options.map((op) => {
      if (op.id === option.id) {
        return {
          ...op,
          typeRoomId: room.id,
          typeRoom: room.typeRoom,
          roomName: "",
          roomPrice: room.price,
          maxPerson: room.maxPerson,
        };
      }
      return op;
    });
    setOptions(newOptions);

    const findOption = options.find((op) => op.id === option.id);
    if (findOption.typeRoom !== "") {
      let newAddOptions = [
        ...options,
        {
          id: v4(),
          adult: 2,
          children: 0,
          typeRoomId: room.id,
          typeRoom: room.typeRoom,
          roomPrice: room.price,
          roomName: "",
          maxPerson: room.maxPerson,
        },
      ];
      setOptions(newAddOptions);
    }
    // const newOptions = options.map((op) => {
    //   if (op.id === option.id) {
    //     return {
    //       ...op,
    //       typeRoomId: room.id,
    //       typeRoom: room.typeRoom,
    //       roomPrice: room.price,
    //       maxPerson: room.maxPerson,
    //     };
    //   }
    //   return op;
    // });
    // setOptions(newOptions);
    setOrderInfo({ ...orderInfo, options: options });
    localStorage.setItem("ORDER_INFO", JSON.stringify(orderInfo));

    //
    let minusValue = Object.keys(objQtyTypeId).reduce((minusValue, key) => {
      if (Number(key) === room.id) {
        return {
          ...minusValue,
          [key]: objQtyTypeId[key] - 1,
        };
      }
      return {
        ...minusValue,
        [key]: objQtyTypeId[key],
      };
    }, {});
    setObjQtyTypeId(minusValue);

    let filterValue0 = Object.keys(minusValue).reduce((filterValue0, key) => {
      if (minusValue[key] === 0)
        return {
          ...filterValue0,
          [key]: Number(0),
        };
      return {
        ...filterValue0,
        [key]: minusValue[key],
      };
    }, {});

    setObjQtyTypeId(filterValue0);
    console.log("TYPE ROOM ID :>> ", room.id);
  };

  useEffect(() => {
    let filterValue0 = Object.keys(objQtyTypeId).reduce((filterValue0, key) => {
      if (objQtyTypeId[key] === 0)
        return {
          ...filterValue0,
          [key]: objQtyTypeId[key],
        };
      return filterValue0;
    }, {});
    console.log(
      "🚀 ~ file: RoomItem.jsx ~ line 112 ~ filterValue0 ~ objQtyTypeId",
      objQtyTypeId
    );

    const typeId = Object.keys(filterValue0);

    setSoldOutId(typeId);
    console.log("soldOutId :>> ", soldOutId);
  }, [objQtyTypeId]);

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
          <Col
            className="rate-inclusions"
            xs={24}
            sm={11}
            md={11}
            xl={13}
          ></Col>
          <Col xs={24} sm={13} md={13} xl={11}>
            {soldOutId.length === 1 ? (
              room.id === Number(soldOutId[0]) ? (
                <Row className="rate-price-select">
                  <Col xs={24} sm={16} md={16} xl={16}>
                    <p style={{ fontWeight: 700 }}>VND {roomPriceString} </p>
                    <p>{sumGuest} guests, 1 night</p>
                  </Col>

                  <Col sx={24} sm={8} md={8} xl={8}>
                    <div>
                      <div className="sold-out">Sold out</div>
                    </div>
                  </Col>
                </Row>
              ) : (
                <Row className="rate-price-select">
                  <Col xs={24} sm={16} md={16} xl={16}>
                    <p style={{ fontWeight: 700 }}>VND {roomPriceString} </p>
                    <p>{sumGuest} guests, 1 night</p>
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
              )
            ) : soldOutId.length > 1 ? (
              soldOutId.find((id) => room.id === Number(id)) ? (
                <Row className="rate-price-select">
                  <Col xs={24} sm={16} md={16} xl={16}>
                    <p style={{ fontWeight: 700 }}>VND {roomPriceString} </p>
                    <p>{sumGuest} guests, 1 night</p>
                  </Col>

                  <Col sx={24} sm={8} md={8} xl={8}>
                    <div>
                      <div className="sold-out">Sold out</div>
                    </div>
                  </Col>
                </Row>
              ) : (
                <Row className="rate-price-select">
                  <Col xs={24} sm={16} md={16} xl={16}>
                    <p style={{ fontWeight: 700 }}>VND {roomPriceString} </p>
                    <p>{sumGuest} guests, 1 night</p>
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
              )
            ) : (
              soldOutId.length < 1 && (
                <Row className="rate-price-select">
                  <Col xs={24} sm={16} md={16} xl={16}>
                    <p style={{ fontWeight: 700 }}>VND {roomPriceString} </p>
                    <p>{sumGuest} guests, 1 night</p>
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
              )
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default RoomItem;

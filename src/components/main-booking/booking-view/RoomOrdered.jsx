import React, { useContext, useEffect } from "react";
import * as RiIcons from "react-icons/ri";
import { CustomerContext } from "../../../providers/CustomerContext";
import { formatPrice } from "../../../utils";
import { v4 } from "uuid";

function RoomOrdered({ option, index }) {
  const { orderInfo, setOrderInfo, options, setOptions } =
    useContext(CustomerContext);

  const totalRoomPrice = option.roomPrice * orderInfo.nights;
  const totalRoomPriceString = formatPrice(totalRoomPrice);

  const handleRemoveRoomBook = (option) => {
    const filterOption = orderInfo.options.filter((op) => op.id !== option.id);
    setOptions(filterOption);
    setOrderInfo({ ...orderInfo, options: options });
    localStorage.setItem("ORDER_INFO", JSON.stringify(orderInfo));

    if (orderInfo.options.length <= 1) {
      const findOptions = orderInfo.options.map((op) => {
        if (op.id === option.id) {
          return {
            id: v4(),
            adult: 2,
            children: 0,
            typeRoom: "",
            roomPrice: 0,
            typeRoomId: 0,
            roomName: "",
            maxPerson: 6,
          };
        }
        return op;
      });
      setOptions(findOptions);
      setOrderInfo({ ...orderInfo, options: options });
      localStorage.setItem("ORDER_INFO", JSON.stringify(orderInfo));
    }

    // let plusValue = Object.keys(objQtyTypeId).reduce((plusValue, key) => {
    //   if (Number(key) === option.typeRoomId) {
    //     return {
    //       ...plusValue,
    //       [key]: objQtyTypeId[key] + 1,
    //     };
    //   }
    //   return {
    //     ...plusValue,
    //     [key]: objQtyTypeId[key],
    //   };
    // }, {});

    // console.log("TYPE ROOM ID :>> ", option.typeRoomId);
    // console.log("objQtyTypeID + :>> ", plusValue);

    // setObjQtyTypeId(plusValue);
  };

  // useEffect(() => {
  //  const typeId = soldOutIdFilterValue0(objQtyTypeId);

  //   setSoldOutId(typeId);
  // }, [objQtyTypeId]);

  return (
    <div className="room-select">
      <div className="flex">
        <div className="booking-heading-room">
          <b>{options.length > 1 ? `Room ${index + 1}:` : ""}</b>&nbsp;{" "}
          {option.typeRoom}
        </div>
        <span
          style={{ cursor: "pointer" }}
          onClick={() => handleRemoveRoomBook(option)}
        >
          <RiIcons.RiDeleteBinLine />
        </span>
      </div>
      <div className="flex">
        <div>
          <p>
            {option.adult + option.children} guests {orderInfo.nights} night
          </p>
        </div>
        <span className="room-select-price">VND {totalRoomPriceString}</span>
      </div>
    </div>
  );
}

export default RoomOrdered;

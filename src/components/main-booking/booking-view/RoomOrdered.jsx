import React, { useContext, useEffect } from "react";
import * as RiIcons from "react-icons/ri";
import { CustomerContext } from "../../../providers/CustomerContext";
import { v4 } from "uuid";

function RoomOrdered({ option, index }) {
  const { customerBook, options, setOptions } = useContext(CustomerContext);

  const totalRoomOption = String(
    option.roomPrice * customerBook.nights
  ).replace(/(.)(?=(\d{3})+$)/g, "$1,");

  const handleRemoveRoomBook = (id) => {
    const filterOption = options.filter((option) => option.id !== id);
    setOptions(filterOption);
  };

  if (options.length === 0) {
    setOptions({
      id: v4(),
      adult: 2,
      children: 0,
      roomName: "",
      roomPrice: 0,
    });
  }

  return (
    <div className="room-select">
      <div className="flex">
        <div className="booking-heading-room">
          <i>Room {index + 1}:</i> {option.roomName}
        </div>
        <span
          style={{ cursor: "pointer" }}
          onClick={() => handleRemoveRoomBook(option.id)}
        >
          <RiIcons.RiDeleteBinLine />
        </span>
      </div>
      <div className="flex">
        <div>
          <p>
            {option.adult + option.children} guests {customerBook.nights} night
          </p>
          <p>Non-refundable</p>
        </div>
        <span className="room-select-price">VND {totalRoomOption}</span>
      </div>
    </div>
  );
}

export default RoomOrdered;

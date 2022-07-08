import React, { useContext } from "react";
import { CustomerContext } from "../../../providers/CustomerContext";

function PayRoomOrdered({ option, index }) {
  const { customerBook } = useContext(CustomerContext);
  const totalRoomOption = String(
    option.roomPrice * customerBook.nights
  ).replace(/(.)(?=(\d{3})+$)/g, "$1,");

  return (
    <div className="pay-room-select">
      <div className="flex">
        <div className="pay-booking-heading-room fs1-fw7">
          <i>Room {index + 1}:</i> {option.roomName}
        </div>
      </div>
      <div className="flex">
        <div>
          <p className="fs0875">
            {option.adult + option.children} guests {customerBook.nights} night
          </p>
          <p className="fs0875">Non-refundable</p>
        </div>
        <span className="room-select-price">VND {totalRoomOption}</span>
      </div>
    </div>
  );
}

export default PayRoomOrdered;

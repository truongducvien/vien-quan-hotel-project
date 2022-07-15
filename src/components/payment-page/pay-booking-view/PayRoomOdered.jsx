import React, { useContext } from "react";
import { CustomerContext } from "../../../providers/CustomerContext";
import { formatPrice } from "../../../utils";

function PayRoomOrdered({ option, index }) {
  const { customerBook } = useContext(CustomerContext);

  const totalRoomPrice = option.roomPrice * customerBook.nights;
  const totalRoomPriceString = formatPrice(totalRoomPrice);

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
        </div>
        <span className="room-select-price">VND {totalRoomPriceString}</span>
      </div>
    </div>
  );
}

export default PayRoomOrdered;

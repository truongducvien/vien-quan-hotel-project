import React, { useContext } from "react";
import { CustomerContext } from "../../../providers/CustomerContext";
import { formatPrice } from "../../../utils";

function PayRoomOrdered({ option, index }) {
  const { orderInfo } = useContext(CustomerContext);

  const totalRoomPrice = option.roomPrice * orderInfo.nights;
  const totalRoomPriceString = formatPrice(totalRoomPrice);

  return (
    <div className="pay-room-select">
      <div className="flex">
        <div className="pay-booking-heading-room fs1-fw7">
          <i>Room {index + 1}:</i> {option.typeRoom}
        </div>
      </div>
      <div className="flex">
        <div>
          <p className="fs0875">
            {option.adult + option.children} guests {orderInfo.nights} night
          </p>
        </div>
        <span className="room-select-price">VND {totalRoomPriceString}</span>
      </div>
      <div></div>
    </div>
  );
}

export default PayRoomOrdered;

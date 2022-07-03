import React from "react";
import * as RiIcons from "react-icons/ri";

function RoomSelect() {
  return (
    <div className="room-select">
      <div className="flex">
        <div className="booking-heading-room">
          2 Bedroom Apartment – 85m2Flash Deal- 02 BR Apart
        </div>
        <span>
          <RiIcons.RiDeleteBinLine />
        </span>
      </div>
      <div className="flex">
        <div>
          <p>2 guests 1 night</p>
          <p>Non-refundable</p>
        </div>
        <span className="room-select-price">VND 3,141,964.5</span>
      </div>
    </div>
  );
}

export default RoomSelect;

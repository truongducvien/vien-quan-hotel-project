import React from "react";
import * as BsIcons from "react-icons/bs";

function RoomSoldOut({ room }) {
  return (
    <div className="room-rate-list">
      <div className="room-rate-name">{room.rateList.nameRate}</div>
      <div className="room-rate-wrapper flex">
        <div className="rate-inclusions">
          <p>
            {room.iconWarning}
            {room.rateList.refundable}
          </p>
          <p>
            {room.iconWarning}
            {room.rateList.payTimes}
          </p>
        </div>

        <div className="sold-out">Sold out</div>
        <button className="sold-out-btn">
          <BsIcons.BsCalendarWeek /> &nbsp; Find available dates
        </button>
      </div>
    </div>
  );
}

export default RoomSoldOut;

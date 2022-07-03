import React from "react";

function RoomRateList({ room }) {
  return (
    <div className="room-rate-list">
      <div className="room-rate-name">{room?.rateList.nameRate}</div>
      <div className="room-rate-wrapper flex">
        <div className="rate-inclusions">
          <p>
            {room.iconCancelRate}
            {room?.rateList.refundable}
          </p>
          <p>
            {room.iconCancelRate}
            {room?.rateList.payTimes}
          </p>
        </div>
        <div className="rate-price-select flex">
          <div className="rate-price">
            <p style={{ fontWeight: 700 }}>VND 3,673,214.72</p>
            <p>Cost for 1 night, 2 guests</p>
          </div>
          <button className="rate-select-btn">Select</button>
        </div>
      </div>
    </div>
  );
}

export default RoomRateList;

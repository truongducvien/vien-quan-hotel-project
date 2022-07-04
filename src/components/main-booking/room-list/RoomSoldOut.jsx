import React, { useState } from "react";
import * as BsIcons from "react-icons/bs";
// import DateRangePicker from "react-bootstrap-daterangepicker";
// import "bootstrap/dist/css/bootstrap.css";
// import "bootstrap-daterangepicker/daterangepicker.css";

function RoomSoldOut({ room }) {
  const [rateCalendar, setRateCalendar] = useState(false);
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

        <div className="sold-out">Sold out</div>
        {rateCalendar ? (
          <button
            className="sold-out-btn"
            onClick={() => {
              setRateCalendar(!rateCalendar);
            }}
          >
            <BsIcons.BsXLg /> &nbsp; Close room rate calendar
          </button>
        ) : (
          <button
            className="sold-out-btn"
            onClick={() => {
              setRateCalendar(!rateCalendar);
            }}
          >
            <BsIcons.BsCalendarWeek /> &nbsp; Find available dates
          </button>
        )}
      </div>
    </div>
  );
}

export default RoomSoldOut;

//  <DateRangePicker
//    initialSettings={{ startDate: "1/1/2014", endDate: "3/1/2014" }}
//  >
//    <button>
//      <input type="text" className="form-control" />
//    </button>
//  </DateRangePicker>;

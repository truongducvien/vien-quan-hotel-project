import React, { useContext } from "react";
import "../style/booking-view.scss";
import { Button } from "antd";
import { CustomerContext } from "../../../providers/CustomerContext";
import { dateString } from "../../../utils";

function BookViewNone() {
  const { orderInfo, options } = useContext(CustomerContext);

  const startDate = orderInfo.date.startDay;
  const startDateString = dateString(startDate);
  const endDate = orderInfo.date.endDay;
  const endDateString = dateString(endDate);

  let sumGuests = 0;
  orderInfo?.options.forEach((option) => {
    sumGuests += parseFloat(option.adult) + parseFloat(option.children);
  });

  return (
    <div>
      <div className="booking-box">
        <div className="booking-heading"></div>
        <div className="booking-body">
          <div className="section-info">
            <div className="flex">
              <div className="date">
                {startDateString} – {endDateString}
              </div>
              <div className="total-nights">{orderInfo.nights} night</div>
            </div>
            <div className="occupancy-rooms">
              {orderInfo.options.length} room, {sumGuests} guests
            </div>
          </div>

          <div
            className="room-select-list"
            style={{ textAlign: "center", paddingTop: "8px" }}
          >
            <p>Select a rate to continue</p>
          </div>
        </div>
        <div className="btn-sticky">
          <Button
            className="booking-btn null"
            style={{
              height: "38px",
              padding: 0,
              backgroundColor: "#04476180",
              color: "#ffffff80",
            }}
            disabled
          >
            Book
          </Button>
        </div>
      </div>
    </div>
  );
}

export default BookViewNone;

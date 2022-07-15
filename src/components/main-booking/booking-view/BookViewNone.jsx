import React, { useContext } from "react";
import "../style/booking-view.scss";
import { Button } from "antd";
import { CustomerContext } from "../../../providers/CustomerContext";

function BookViewNone() {
  const { customerBook, options } = useContext(CustomerContext);

  const startDay = customerBook.date[0].format("ddd, DD MMM YY");
  const endDay = customerBook.date[1].format("ddd, DD MMM YY");

  let sumGuests = 0;
  options.forEach((option) => {
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
                {startDay} – {endDay}
              </div>
              <div className="total-nights">{customerBook.nights} night</div>
            </div>
            <div className="occupancy-rooms">
              {options.length} room, {sumGuests} guests
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

import React, { useContext } from "react";
import "../style/booking-view.scss";
import RoomSelect from "./RoomSelect";
import { Button, Collapse } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { CustomerContext } from "../../../providers/CustomerContext";

const { Panel } = Collapse;

function BookViewNone() {
  const { customerBook, setCustomerBook, options, setOptions } =
    useContext(CustomerContext);

  let sumGuests = 0;
  options.forEach((option) => {
    sumGuests += parseFloat(option.adult) + parseFloat(option.children);
  });

  let totalPrice = 0;
  options.forEach((option) => {
    totalPrice += option.roomPrice * customerBook.nights;
  });
  let totalPriceString = String(totalPrice).replace(/(.)(?=(\d{3})+$)/g, "$1,");

  return (
    <div>
      <div className="booking-box">
        <div className="booking-heading"></div>
        <div className="booking-body">
          <div className="section-info">
            <div className="flex">
              <div className="date">
                {customerBook.date.startDay} – {customerBook.date.endDay}
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
            className="booking-btn"
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

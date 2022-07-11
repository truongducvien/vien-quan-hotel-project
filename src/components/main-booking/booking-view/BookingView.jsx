import React, { useContext } from "react";
import "../style/booking-view.scss";
import { Collapse } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { CustomerContext } from "../../../providers/CustomerContext";
import RoomOrdered from "./RoomOrdered";
import RoomOrderNone from "./RoomOrderNone";

const { Panel } = Collapse;

function BookingView() {
  const { customerBook, options } = useContext(CustomerContext);

  let sumGuests = 0;
  options.forEach((option) => {
    sumGuests += parseFloat(option.adult) + parseFloat(option.children);
  });

  let totalPrice = 0;
  options.forEach((option) => {
    totalPrice += option.roomPrice * customerBook.nights;
  });
  let totalPriceString = String(totalPrice).replace(/(.)(?=(\d{3})+$)/g, "$1,");

  let tax = parseFloat((totalPrice * 10) / 100).toFixed(0);
  let taxString = String(tax).replace(/(.)(?=(\d{3})+$)/g, "$1,");

  let serviceCharge = parseFloat((totalPrice * 5) / 100).toFixed(0);
  let serviceChargeString = String(serviceCharge).replace(
    /(.)(?=(\d{3})+$)/g,
    "$1,"
  );

  let sumTotal = totalPrice + parseFloat(tax) + parseFloat(serviceCharge);
  let sumTotalString = String(sumTotal).replace(/(.)(?=(\d{3})+$)/g, "$1,");

  return (
    <div className="booking-box">
      <div className="booking-heading">VND&nbsp; {sumTotalString} total</div>
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

        <div className="room-select-list">
          {options.map((option, index) => (
            <div key={option.id}>
              {option.roomName === "" ? (
                <RoomOrderNone />
              ) : (
                <RoomOrdered option={option} index={index} />
              )}
            </div>
          ))}
        </div>

        <div className="line-total flex">
          <div className="line-total name">Total</div>
          <div className="line-total value">VND {sumTotalString}</div>
        </div>
        <Collapse
          bordered={false}
          expandIcon={({ isActive }) => (
            <DownOutlined rotate={isActive ? 180 : 0} />
          )}
          expandIconPosition="end"
        >
          <Panel header="Includes taxes + fees" key="1">
            <div className="flex">
              <div className="date">TAX</div>
              <div className="total-nights">VND {taxString}</div>
            </div>
            <div className="flex">
              <div className="date">SERVICE CHARGE</div>
              <div className="total-nights">VND {serviceChargeString}</div>
            </div>
          </Panel>
        </Collapse>
        <div className="tip-content">
          <p className="balance">Deposit: VND {sumTotalString}</p>
          <p className="balance">Outstanding balance: VND 0</p>
        </div>
      </div>

      <div className="btn-sticky">
        {localStorage.getItem("login") === null ? (
          <Link to="/login">
            <button className="booking-btn">Book</button>
          </Link>
        ) : (
          <Link to="/payment">
            <button className="booking-btn">Book</button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default BookingView;

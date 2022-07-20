import React, { useContext } from "react";
import "../style/booking-view.scss";
import { Button, Collapse } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { CustomerContext } from "../../../providers/CustomerContext";
import RoomOrdered from "./RoomOrdered";
import { dateString, formatPrice } from "../../../utils";

const { Panel } = Collapse;

function BookingView() {
  const { orderInfo, options } = useContext(CustomerContext);

  const startDate = orderInfo.date.startDay;
  const startDateString = dateString(startDate);
  const endDate = orderInfo.date.endDay;
  const endDateString = dateString(endDate);

  let sumGuests = 0;
  orderInfo.options.forEach((option) => {
    sumGuests += parseFloat(option.adult) + parseFloat(option.children);
  });

  let totalPrice = 0;
  orderInfo.options.forEach((option) => {
    totalPrice += option.roomPrice * orderInfo.nights;
  });

  let tax = parseFloat((totalPrice * 10) / 100).toFixed(0);
  let taxString = formatPrice(tax);

  let serviceCharge = parseFloat((totalPrice * 5) / 100).toFixed(0);
  let serviceChargeString = formatPrice(serviceCharge);

  let sumTotal = totalPrice + parseFloat(tax) + parseFloat(serviceCharge);
  let sumTotalString = formatPrice(sumTotal);

  const findRoomNull = orderInfo.options.find((op) => op.typeRoom === "");

  return (
    <div className="booking-box">
      <div className="booking-heading">VND&nbsp; {sumTotalString} total</div>
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

        <div className="room-select-list">
          {options.map((option, index) => (
            <div key={option.id}>
              {option.typeRoom !== "" && (
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
        </div>
      </div>

      <div className="btn-sticky">
        {!findRoomNull ? (
          localStorage.getItem("USER_INFO") !== null ? (
            <Link to="/payment">
              <button className="booking-btn">Book</button>
            </Link>
          ) : (
            <Link to="/login">
              <button className="booking-btn">Book</button>
            </Link>
          )
        ) : (
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
        )}
      </div>
    </div>
  );
}

export default BookingView;

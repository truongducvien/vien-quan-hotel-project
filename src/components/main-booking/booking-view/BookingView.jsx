import React from "react";
import '../style/booking-view.css'
import RoomSelect from "./RoomSelect";
import { Collapse } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Panel } = Collapse;

function BookingView() {
  return (
    <div className="booking-box">
      <div className="booking-heading">VND&nbsp;3,628,969 total</div>
      <div className="booking-body">
        <div className="section-info">
          <div className="flex">
            <div className="date">Tue, 5 July 22 – Wed, 6 July 22</div>
            <div className="total-nights">1 night</div>
          </div>
          <div className="occupancy-rooms">1 room, 2 guests</div>
        </div>
        <div className="room-select-list">
          <RoomSelect />
          <RoomSelect />
          <RoomSelect />
        </div>
        <div className="line-total flex">
          <div className="line-total name">Total</div>
          <div className="line-total value">VND 7,871,532</div>
        </div>
        <Collapse
          defaultActiveKey={["1"]}
          bordered={false}
          expandIcon={({ isActive }) => (
            <DownOutlined rotate={isActive ? 180 : 0} />
          )}
          expandIconPosition="end"
        >
          <Panel header="Includes taxes + fees" key="1">
            <div className="flex">
              <div className="date">TAX</div>
              <div className="total-nights">VND 715,593.82</div>
            </div>
            <div className="flex">
              <div className="date">SERVICE CHARGE</div>
              <div className="total-nights">VND 340,758.96</div>
            </div>
          </Panel>
        </Collapse>
        <div className="tip-content">
          <p className="balance">Deposit: VND 7,871,532</p>
          <p className="balance">Outstanding balance: VND 0</p>
        </div>
      </div>
      <Link to="/payment">
        <div className="btn-sticky">
          <button className="booking-btn">Book</button>
        </div>
      </Link>
    </div>
  );
}

export default BookingView;

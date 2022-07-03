import React from "react";
import "../style/pay-booking-view.css";
import RoomSelect from "./RoomSelect";
import { Collapse } from "antd";
import { DownOutlined } from "@ant-design/icons";

const { Panel } = Collapse;

function PayBookingView() {
  return (
    <div className="pay-booking-box">
      <div className="pay-booking-heading">
        <div className="pay-booking-total">VND&nbsp;3,628,969 total</div>
        <div className="pay-section-info">
          <div className="flex">
            <p className="date">Tue, 5 July 22 – Wed, 6 July 22</p>
            <p className="total-nights">1 night</p>
          </div>
          <div className="occupancy-rooms">1 room, 2 guests</div>
        </div>
      </div>

      <Collapse
        defaultActiveKey={["1"]}
        bordered={false}
        expandIcon={({ isActive }) => (
          <DownOutlined rotate={isActive ? 180 : 0} />
        )}
        expandIconPosition="end"
      >
        <Panel
          className="collapse-header fs1-fw7"
          header="Stay details"
          key="1"
        >
          <div className="pay-booking-body">
            <div className="room-select-list">
              <RoomSelect />
              <RoomSelect />
              <RoomSelect />
            </div>
            <div className="line-total flex">
              <div className="fw7-fs1125">Total</div>
              <div className="fw7-fs1125">VND 7,871,532</div>
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
        </Panel>
      </Collapse>
    </div>
  );
}

export default PayBookingView;

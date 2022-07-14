import React, { useContext } from "react";
import "../style/pay-booking-view.scss";
import { Collapse } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { CustomerContext } from "../../../providers/CustomerContext";
import PayRoomOrdered from "./PayRoomOdered";

const { Panel } = Collapse;

function PayBookingView() {
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
    <div className="pay-booking-box">
      <div className="pay-booking-heading">
        <div className="pay-booking-total">
          VND&nbsp; {sumTotalString} total
        </div>
        <div className="pay-section-info">
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
      </div>

      <Collapse
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
              {options.map((option, index) => (
                <div key={option.id}>
                  {option.roomName !== "" && (
                    <PayRoomOrdered option={option} index={index} />
                  )}
                </div>
              ))}
            </div>
            <div className="line-total flex">
              <div className="fw7-fs1125">Total</div>
              <div className="fw7-fs1125">VND {sumTotalString}</div>
            </div>
            <Collapse
              bordered={false}
              expandIcon={({ isActive }) => (
                <DownOutlined rotate={isActive ? 180 : 0} />
              )}
              expandIconPosition="end"
            >
              <Panel
                header="Includes taxes + fees"
                key="1"
                className=" fs1-fw4"
              >
                <div className="flex">
                  <div className="date">TAX</div>
                  <div className="total-nights">VND {taxString}</div>
                </div>
                <div className="flex ">
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
        </Panel>
      </Collapse>
    </div>
  );
}

export default PayBookingView;

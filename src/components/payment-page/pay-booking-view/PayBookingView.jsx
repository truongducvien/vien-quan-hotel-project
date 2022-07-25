import React, { useContext } from "react";
import "../style/pay-booking-view.scss";
import { Collapse } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { CustomerContext } from "../../../providers/CustomerContext";
import PayRoomOrdered from "./PayRoomOdered";
import { dateString, formatPrice } from "../../../utils";
import { useEffect } from "react";

const { Panel } = Collapse;

function PayBookingView() {
  const { orderInfo, promoCode } = useContext(CustomerContext);

  const startDay = orderInfo.date.startDay;
  const startDateString = dateString(startDay);
  const endDay = orderInfo.date.endDay;
  const endDateString = dateString(endDay);

  let sumGuests = 0;
  orderInfo.options.forEach((option) => {
    sumGuests += parseFloat(option.adult) + parseFloat(option.children);
  });

  let totalPriceRoom = 0;
  orderInfo.options.forEach((option) => {
    totalPriceRoom += option.roomPrice * orderInfo.nights;
  });

  let promoValue = (promoCode.value * totalPriceRoom) / 100;
  let promoValueString = formatPrice(promoValue);

  let totalPrice = totalPriceRoom - promoValue;

  let tax = parseFloat((totalPrice * 10) / 100).toFixed(0);
  let taxString = formatPrice(tax);

  let serviceCharge = parseFloat((totalPrice * 5) / 100).toFixed(0);
  let serviceChargeString = formatPrice(serviceCharge);

  let sumTotal = totalPrice + parseFloat(tax) + parseFloat(serviceCharge);
  let sumTotalString = formatPrice(sumTotal);

  return (
    <div className="pay-booking-box">
      <div className="pay-booking-heading">
        <div className="pay-booking-total">
          VND&nbsp; {sumTotalString} total
        </div>
        <div className="pay-section-info">
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
              {orderInfo.options.map((option, index) => (
                <div key={option.id}>
                  {option.typeRoom !== "" && (
                    <PayRoomOrdered option={option} index={index} />
                  )}
                </div>
              ))}
            </div>
            {promoCode.value !== 0 && (
              <div className="line-discount flex">
                <i className="line-discount name">{promoCode.description}</i>
                <i
                  className="line-discount value"
                  style={{ textDecoration: "line-through" }}
                >
                  VND {promoValueString}
                </i>
              </div>
            )}
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
            </div>
          </div>
        </Panel>
      </Collapse>
    </div>
  );
}

export default PayBookingView;

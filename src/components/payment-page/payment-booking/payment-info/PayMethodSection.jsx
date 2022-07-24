import React, { useState, useEffect } from "react";
import { Col, Row, Radio, Space, Collapse } from "antd";
import "../..//style/pay-form-contact.scss";
import { useContext } from "react";
import { CustomerContext } from "../../../../providers/CustomerContext";
import { creditCards } from "./credit-cards.js";
import FormCreditCard from "./form-credit-card/FormCreditCard";
import { useDispatch, useSelector } from "react-redux";
import { postBookingAction } from "../../../../stores/slices/bookingsSlice";
import { DownOutlined } from "@ant-design/icons";

const { Panel } = Collapse;

function PayMethodSection() {
  const bookingState = useSelector((state) => state?.booking?.bookingState);
  const dispatch = useDispatch();
  const { orderInfo, setOrderInfo, currentPay, setCurrentPay } =
    useContext(CustomerContext);
  const [payMethod, setPayMethod] = useState("Credit/Debit Card");
  const [ellipsisCancel, setEllipsisCancel] = useState(false);

  useEffect(() => {
    let newPayMethod = {
      method: payMethod,
      payInfo: {
        cardNumber: "",
        nameOnCard: "",
      },
    };
    setOrderInfo({ ...orderInfo, payment: newPayMethod });
    localStorage.setItem("ORDER_INFO", JSON.stringify(orderInfo));
  }, [payMethod]);

  const onAddUserInfoPay = () => {
    dispatch(postBookingAction(orderInfo));

    setCurrentPay(currentPay + 1);
  };

  return (
    <div className="pay-form-contact">
      <h2>Pay with?</h2>
      <Radio.Group
        onChange={(e) => setPayMethod(e.target.value)}
        value={payMethod}
      >
        <Space direction="vertical">
          <Radio value="Cash">
            <h6>Cash</h6>
            {payMethod === "Cash" ? "Pay directly at the hotel" : null}
          </Radio>
          <Radio value="Credit/Debit Card">
            <Row>
              <Col span={12}>
                <h6>Credit/Debit Card &nbsp;</h6>
              </Col>
              <Col span={12}>
                <div className="pay-cards">
                  {creditCards.map((card) => (
                    <div key={card.name}>
                      <img src={card.imageUrl} alt="" />
                    </div>
                  ))}
                </div>
              </Col>
            </Row>
            {payMethod === "Credit/Debit Card" ? <FormCreditCard /> : null}
          </Radio>
        </Space>
      </Radio.Group>
      <Collapse
        defaultActiveKey={["1"]}
        bordered={false}
        expandIcon={({ isActive }) => (
          <DownOutlined rotate={isActive ? 180 : 0} />
        )}
        expandIconPosition="end"
        className="pay-method"
      >
        <Panel header="Cancellation policy" key="1">
          <div className="">
            <div
              className={ellipsisCancel ? "" : "ellipsis-text"}
              onClick={() => {
                setEllipsisCancel(!ellipsisCancel);
              }}
            >
              <p>
                Room rate book on standard rate: Any cancellation received
                within 7 days prior to arrival date will incur the full period
                charge. Failure to arrive at your hotel or property will be
                treated as a No-Show and no refund will be given
              </p>
              <p>
                Room rate book under promotion: Any cancellation received within
                14 days prior to arrival date will incur the full period charge.
                Failure to arrive at your hotel or property will be treated as a
                No-Show and no refund will be given
              </p>
              <p>
                No-showed booking will be full charged for whole booking for
                full length stay
              </p>
            </div>
            <div
              style={{
                marginTop: "10px",
                cursor: "pointer",
                color: "#005e84",
              }}
              onClick={() => {
                setEllipsisCancel(!ellipsisCancel);
              }}
            >
              {ellipsisCancel ? "Read less" : "Read more"}
            </div>
          </div>
        </Panel>
      </Collapse>
      <p style={{ color: "#999" }}>
        By proceeding with this booking, I agree to{" "}
        <span
          style={{
            color: "#066a92",
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          {" "}
          Terms of Use
        </span>{" "}
        and{" "}
        <span
          style={{
            color: "#066a92",
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          Privacy Policy
        </span>
        .
      </p>
      <div className="pay-submit-contact">
        <button
          type="submit"
          onClick={onAddUserInfoPay}
          className="booking-btn"
        >
          Book
        </button>
      </div>
    </div>
  );
}

export default PayMethodSection;

import { Steps } from "antd";
import React, { useContext } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { CustomerContext } from "../../../providers/CustomerContext";
import { fetchBookingAction } from "../../../stores/slices/booking.slice";
import { ConfirmBooking } from "./confirm-booking/ConfirmBooking";
import { CustomerInfo } from "./customer-info/CustomerInfo";
import { PaymentInfo } from "./payment-info/PaymentInfo";
const { Step } = Steps;
const steps = [
  {
    title: "Customer Information",
    content: <CustomerInfo />,
  },
  {
    title: "Payment Information",
    content: <PaymentInfo />,
  },
  {
    title: "Booking success",
    content: <ConfirmBooking />,
  },
];

export const PaymentBooking = () => {
  const { currentPay, setCurrentPay } = useContext(CustomerContext);

  useEffect(() => {
    setCurrentPay(0);
  }, []);

  return (
    <div className="pay-step">
      <Steps current={currentPay}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content">{steps[currentPay].content}</div>
      {/* <div className="steps-action">
        {currentPay === 1 && (
          <Button
            style={{
              margin: "0 8px",
            }}
            onClick={() => prev()}
          >
            Back to your booking details
          </Button>
        )}
      </div> */}
    </div>
  );
};

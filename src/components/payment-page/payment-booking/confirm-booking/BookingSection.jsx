import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CheckOutlined } from "@ant-design/icons";
import { CustomerContext } from "../../../../providers/CustomerContext";
import { fetchBookingAction } from "../../../../stores/slices/bookingsSlice";

function BookingSection() {
  const { orderInfo } = useContext(CustomerContext);
  const bookingState = useSelector((state) => state.booking.bookingState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBookingAction());
  }, []);
  const bookingList = bookingState.data;

  let bookingLength = bookingList.length;
  let bookingNumber = bookingLength + 1;

  let bookingName =
    orderInfo.userInfo.firstName + " " + orderInfo.userInfo.lastName;
  let bookingEmail = orderInfo.userInfo.email;
  let payMethod = orderInfo.payment.method;

  return (
    <div className="pay-form-contact booking-success">
      <div className="booking-success">
        <h2 style={{ paddingLeft: 0, color: "#004862" }}>Booking success</h2>
        <div>
          <h6 style={{ paddingLeft: "25px", color: "#004862" }}>
            <b>Hi {bookingName}!</b>
          </h6>
          <h6>
            <CheckOutlined />
            Your booking at{" "}
            <span style={{ color: "#007fae" }}>Ocean Villa</span> has been
            confirmed.
          </h6>

          <h6 style={{ display: "flex" }}>
            <CheckOutlined />

            {payMethod === "Cash" ? (
              <span>
                You have chosen to pay directly at the hotel,{" "}
                <span style={{ color: "#007fae" }}>Ocean Villa</span> will not
                charge your credit card.
              </span>
            ) : (
              <span>
                You have chosen to pay by credit card, you will needn't to pay
                at the hotel.
              </span>
            )}
          </h6>
          <h6>
            <CheckOutlined />
            &nbsp; Booking Number:{" "}
            <b style={{ color: "blue" }}>{bookingNumber}</b>
          </h6>

          <h6 style={{ display: "flex" }}>
            <CheckOutlined />

            <span>
              Your booking confirmation will be email to: &nbsp;
              <b style={{ color: "green" }}>{bookingEmail}</b>
            </span>
          </h6>
          <h6 style={{ display: "flex" }}>
            <CheckOutlined />

            <span>
              Please present Booking number or this confirmation when check-in
            </span>
          </h6>
        </div>
        <div className="pay-submit-contact">
          <button className="pay-submit-btn">OK</button>
        </div>
      </div>
    </div>
  );
}

export default BookingSection;

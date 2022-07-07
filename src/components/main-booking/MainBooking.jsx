import React, { useContext, useEffect } from "react";
import "./style/main-booking.css";
import "antd/dist/antd.css";
import { Row, Col } from "antd";
import BookingView from "./booking-view/BookingView";
import RoomList from "./room-list/RoomList";
import BookHeader from "./BookHeader";
import BookSearchTesting from "./BookSearchTesting";
import { CustomerContext } from "../../providers/CustomerContext";
import { DataRoomsDemo } from "../../stores/data-demo";

function MainBooking() {
  const { customer, setCustomer } = useContext(CustomerContext);

  useEffect(() => {
    const storedCustomer = localStorage.getItem("CUSTOMER-HOTEL");
    if (storedCustomer === null) {
      setCustomer({});
      return;
    }
    setCustomer(JSON.parse(storedCustomer));
    console.log("mainBook:", customer);
  }, []);

  // console.log("DataRoomsDemo:", DataRoomsDemo);

  // const handleFilterRoom = (option) => {
  //   console.log(option);
  //   let filterRoom = DataRoomsDemo.filter(
  //     (room) => room.maxPerson <= option.adult + option.children
  //   );
  //   console.log("filterRoom", filterRoom);
  // };
  return (
    <div>
      <main className="main-container">
        <BookHeader />
        <BookSearchTesting />
        <Row className="room-booking">
          <Col className="room-list" xs={24} sm={24} md={14} xl={16}>
            {customer === null || customer === undefined || customer === {} ? (
              <RoomList />
            ) : (
              ""
            )}
            {/*  customer.options.map((option, index) => (
                <div key={option.id}>
                  <h6 onClick={() => handleFilterRoom(option)}>
                    Room {index + 1}
                  </h6>
                </div>
              ))
            )} */}
          </Col>
          <Col className="booking-view" xs={24} sm={24} md={10} xl={8}>
            <BookingView />
          </Col>
        </Row>
      </main>
    </div>
  );
}

export default MainBooking;

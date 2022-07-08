import React, { useContext } from "react";
import "./style/main-booking.css";
import "antd/dist/antd.css";
import { Row, Col } from "antd";
import BookingView from "./booking-view/BookingView";
import BookHeader from "./BookHeader";
import { CustomerContext } from "../../providers/CustomerContext";
import RoomListOption from "./room-list/RoomListOption";
import { Tabs } from "antd";
import BookSearchBar from "./BookSearchBar";
const { TabPane } = Tabs;

function MainBooking() {
  const { options } = useContext(CustomerContext);

  return (
    <div>
      <main className="main-container">
        <BookHeader />
        <BookSearchBar />
        <Row className="room-booking">
          <Col className="room-list" xs={24} sm={24} md={14} xl={16}>
            <Tabs defaultActiveKey="1">
              (
              {options.map((option, index) => (
                <TabPane key={index + 1} tab={`Room ${index + 1}`}>
                  <RoomListOption
                    maxPerson={option.adult + option.children}
                    idOption={option.id}
                  />
                </TabPane>
              ))}
              )
            </Tabs>
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

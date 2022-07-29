import React, { useContext } from "react";
import "./style/main-booking.scss";
import "antd/dist/antd.css";
import { Row, Col } from "antd";
import BookingView from "./booking-view/BookingView";
import { BookHeader } from "./BookHeader";
import { CustomerContext } from "../../providers/CustomerContext";
import RoomListOption from "./room-list/RoomListOption";
import { Tabs } from "antd";
import BookViewNone from "./booking-view/BookViewNone";
import BookSearchBar from "./book-select-bar/BookSearchBar";
import { PageFooter } from "../footer-pages/PageFooter";
import { RoomPagination } from "../room-pagination/RoomPagination";

const { TabPane } = Tabs;

function MainBooking() {
  const { orderInfo } = useContext(CustomerContext);

  let totalPrice = 0;
  orderInfo.options.forEach((option) => {
    totalPrice += option.roomPrice * orderInfo.nights;
  });

  return (
    <div>
      <main className="main-container">
        <div style={{ position: "sticky", top: 0, zIndex: 4 }}>
          <BookHeader />
        </div>

        <div className="bg-absolute"></div>

        <div className="sticky-searchbar">
          <BookSearchBar />
        </div>
        <div style={{ minHeight: "100vh" }}>
          <Row className="room-booking">
            <Col className="room-list" xs={24} sm={24} md={14} xl={16}>
              <Tabs defaultActiveKey="1">
                {orderInfo.options.map((option, index) => (
                  <TabPane key={index + 1} tab={`Room ${index + 1}`}>
                    <RoomListOption option={option} />
                  </TabPane>
                ))}
              </Tabs>
            </Col>
            <Col className="booking-view" xs={24} sm={24} md={10} xl={8}>
              {totalPrice === 0 ? <BookViewNone /> : <BookingView />}
            </Col>
          </Row>
        </div>
        <PageFooter />
      </main>
    </div>
  );
}

export default MainBooking;

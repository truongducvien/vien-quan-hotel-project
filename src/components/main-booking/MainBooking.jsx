import React, { useContext, useEffect } from "react";
import "./style/main-booking.scss";
import "antd/dist/antd.css";
import { Row, Col } from "antd";
import BookingView from "./booking-view/BookingView";
import BookHeader from "./BookHeader";
import { CustomerContext } from "../../providers/CustomerContext";
import RoomListOption from "./room-list/RoomListOption";
import { Tabs } from "antd";
import BookViewNone from "./booking-view/BookViewNone";
import BookSearchBar from "./book-select-bar/BookSearchBar";
import { useDispatch, useSelector } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";
import { fetchBookingAction } from "../../stores/slices/booking.slice";
import { PageFooter } from "../footer-pages/PageFooter";
import { timeStartDay } from "../../utils";
import { fetchRoomAction } from "../../stores/slices/room.slice";

const { TabPane } = Tabs;

function MainBooking() {
  const {
    orderInfo,
    setObjQtyTypeId,
    objQtyTypeId,
    setAvailableRooms,
    availableRooms,
  } = useContext(CustomerContext);
  const bookingState = useSelector((state) => state.booking.bookingState);
  const roomState = useSelector((state) => state.room.roomState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBookingAction());
    dispatch(fetchRoomAction());
  }, []);

  const loading = bookingState?.loading;
  let totalPrice = 0;
  orderInfo.options.forEach((option) => {
    totalPrice += option.roomPrice * orderInfo.nights;
  });

  // let futureDateOrdered = bookingState?.data.filter(
  //   (order) => order?.date.startDay >= timeStartDay(Date.now())
  // );

  // let canOrderDate = futureDateOrdered.filter(
  //   (order) =>
  //     orderInfo.date.endDay < order?.date.startDay ||
  //     order?.date.endDay < orderInfo.date.startDay
  // );

  // let cannotOrderDate = futureDateOrdered.filter(
  //   (order) => !canOrderDate.includes(order)
  // );

  // let orderedOptions = cannotOrderDate.map((order) => order.options);

  // let OrderedTypeRoomId = orderedOptions.map((options) =>
  //   options.map((option) => option.typeRoomId)
  // );

  // let mergeOrderedTypeRoomId = Array.from([].concat(...OrderedTypeRoomId));

  // const qtyTypeRoomIdOrdered = mergeOrderedTypeRoomId.reduce(
  //   (acc, curr) => ((acc[curr] = (acc[curr] || 0) + 1), acc),
  //   {}
  // );

  // let arrQtyRoomsOfTypeRoom = roomState?.data.map((typeRoom) => [
  //   `${typeRoom.id}`,
  //   Number(`${typeRoom.roomList.length}`),
  // ]);

  // let objQtyRoomsOfTypeRoom = Object.fromEntries(arrQtyRoomsOfTypeRoom);

  // let diffMinus = Object.keys(objQtyRoomsOfTypeRoom).reduce((diff, key) => {
  //   if (qtyTypeRoomIdOrdered[key] >= objQtyRoomsOfTypeRoom[key]) {
  //     return diff;
  //   } else if (qtyTypeRoomIdOrdered[key] < objQtyRoomsOfTypeRoom[key]) {
  //     return {
  //       ...diff,
  //       [key]: objQtyRoomsOfTypeRoom[key] - qtyTypeRoomIdOrdered[key],
  //     };
  //   } else
  //     return {
  //       ...diff,
  //       [key]: objQtyRoomsOfTypeRoom[key],
  //     };
  // }, {});
  // console.log("objQtyTypeId >>>>>", diffMinus);
  // setObjQtyTypeId(diffMinus);

  // useEffect(() => {
  //   let arrayDiff = Object.keys(objQtyTypeId);

  //   const arrayDiffNum = arrayDiff.map((str) => {
  //     return Number(str);
  //   });

  //   let newAvailableRooms = roomState?.data.filter((typeRoom) =>
  //     arrayDiffNum.includes(typeRoom.id)
  //   );

  //   setAvailableRooms(newAvailableRooms);
  // }, [objQtyTypeId, dispatch]);

  return (
    <div>
      {loading === true ? (
        <div>
          <LoadingOutlined />
        </div>
      ) : (
        ""
      )}
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
              {/* {orderInfo.options.length <= 1 ? (
                orderInfo.options.map((option) => (
                  <div className="none-tab-mt" key={option.id}>
                    <RoomListOption option={option} />
                  </div>
                ))
              ) : ( */}
              <Tabs defaultActiveKey="1">
                {orderInfo.options.map((option, index) => (
                  <TabPane key={index + 1} tab={`Room ${index + 1}`}>
                    <RoomListOption option={option} />
                  </TabPane>
                ))}
              </Tabs>
              {/* )} */}
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

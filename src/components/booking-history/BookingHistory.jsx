import { Col, Modal, Popconfirm, Row, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookingIdAction } from "../../stores/slices/fetchBookingId.slice";
import { patchBookingStatusAction } from "../../stores/slices/patchStatusBooking.slice";
import { bookingSummaryPrice, timeStartDay } from "../../utils";
import { BookHeader } from "../main-booking/BookHeader";
import BookingHistoryView from "./BookingHistoryView";
import "./style.scss";

export function BookingHistory() {
  const userInfo = useSelector((state) => state.user.userInfoState);
  const patchBookingStatus = useSelector(
    (state) => state.patchBookingStatus.patchBookingStatusState
  );
  const dispatch = useDispatch();
  const [tableData, setTableData] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [bookingRecord, setBookingRecord] = useState();

  const fetchBookingIdState = useSelector(
    (state) => state.fetchBookingId.fetchBookingIdState
  );

  useEffect(() => {
    dispatch(fetchBookingIdAction(userInfo?.data.id));
  }, [patchBookingStatus?.data]);

  useEffect(() => {
    let newTableData = [];
    fetchBookingIdState?.data.map((booking, index) => {
      newTableData = [
        ...newTableData,
        {
          key: index + 1,
          bookingNumber: booking.id,
          startDay: booking.date.startDay,
          endDay: booking.date.endDay,
          qtyRoom: booking.options.length,
          bookingSummary: bookingSummaryPrice(booking, booking.options),
          payMethod: booking.payment.method,
          status: booking.status,
          booking: booking,
        },
      ];
    });
    setTableData(newTableData);
  }, [fetchBookingIdState?.data]);

  const handleView = (booking) => {
    setBookingRecord(booking);
    setShowAddModal(true);
  };

  const handleCancelBooking = (booking) => {
    dispatch(patchBookingStatusAction(booking));
  };

  const columns = [
    {
      title: "Index",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Booking Number",
      dataIndex: "bookingNumber",
      key: "bookingNumber",
    },
    {
      title: "Check in",
      dataIndex: "startDay",
      key: "startDay",
      render: (time) => new Date(time).toDateString(),
    },
    {
      title: "Check out",
      dataIndex: "endDay",
      key: "endDay",
      render: (time) => new Date(time).toDateString(),
    },
    {
      title: "Room Quantity",
      dataIndex: "qtyRoom",
      key: "qtyRoom",
    },
    {
      title: "Booking Summary",
      dataIndex: "bookingSummary",
      key: "bookingSummary",
    },
    {
      title: "Pay Method",
      dataIndex: "payMethod",
      key: "payMethod",
    },
    {
      title: "Status",
      dataIndex: "booking",
      key: "booking",
      render: (booking) => {
        return booking.date.endDay < timeStartDay(Date.now()) ? (
          <span style={{ color: "purple" }}>Checked-out</span>
        ) : booking.status === "Cancel" ? (
          <span style={{ color: "red" }}>Cancel</span>
        ) : booking.status === "Booked" ? (
          <span style={{ color: "green" }}>Booked</span>
        ) : booking.date.startDay <= timeStartDay(Date.now()) &&
          booking.date.endDay >= timeStartDay(Date.now()) ? (
          <span style={{ color: "blue" }}>Checked-in</span>
        ) : (
          ""
        );
      },
    },
    {
      title: "operation",
      dataIndex: "booking",
      key: "booking",
      render: (booking) => {
        return booking.status === "Cancel" ||
          booking.date.endDay < timeStartDay(Date.now()) ? (
          <span>
            <Typography.Link onClick={() => handleView(booking)}>
              View
            </Typography.Link>
          </span>
        ) : (
          <span>
            <Typography.Link
              onClick={() => handleView(booking)}
              style={{
                marginRight: 32,
              }}
            >
              View
            </Typography.Link>
            <Popconfirm
              title="Sure to cancel?"
              onConfirm={() => handleCancelBooking(booking)}
            >
              <a style={{ color: "red" }}>Cancel</a>
            </Popconfirm>
          </span>
        );
      },
    },
  ];
  return (
    <div className="booking-report">
      <BookHeader />
      <div className="booking-report-header">
        <h1 className="booking-report-title">Booking History</h1>
        <hr />
      </div>

      <div className="booking-report-table">
        <Row>
          <Col xs={24} sm={24} md={24} lg={24}>
            <Table
              columns={columns}
              dataSource={tableData}
              pagination={{
                pageSize: 9,
              }}
            />
            <Modal
              title="Your Booking"
              visible={showAddModal}
              onCancel={() => setShowAddModal(false)}
              footer={null}
            >
              <BookingHistoryView booking={bookingRecord} />
            </Modal>
          </Col>
        </Row>
      </div>
    </div>
  );
}

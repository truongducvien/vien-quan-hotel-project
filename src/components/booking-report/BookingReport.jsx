import { Modal, Popconfirm, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookingIdAction } from "../../stores/slices/fetchBookingId.slice";
import { bookingSummaryPrice } from "../../utils";
import { BookHeader } from "../main-booking/BookHeader";
import ReportBookingView from "./ReportBookingView";
import "./style.scss";

export function BookingReport() {
  const userInfo = useSelector((state) => state.user.userInfoState);
  const dispatch = useDispatch();
  const [tableData, setTableData] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState();

  const fetchBookingIdState = useSelector(
    (state) => state.fetchBookingId.fetchBookingIdState
  );

  useEffect(() => {
    console.log("userInfo.id :>> ", userInfo.data.id);
    dispatch(fetchBookingIdAction(userInfo.data.id));
  }, []);

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
          booking: booking,
        },
      ];
    });
    setTableData(newTableData);
  }, [fetchBookingIdState?.data]);

  const handleView = (booking) => {
    setSelectedRecord(booking);
    setShowAddModal(true);
    console.log("selectedRecord :>> ", selectedRecord);
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
      title: "operation",
      dataIndex: "booking",
      key: "booking",
      render: (booking) => {
        return true ? (
          <span>
            <Typography.Link
              onClick={() => handleView(booking)}
              style={{
                marginRight: 32,
              }}
            >
              View
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={() => {}}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link onClick={() => {}}>Edit</Typography.Link>
        );
      },
    },
  ];
  return (
    <div className="booking-report">
      <BookHeader />
      <div className="booking-report-header">
        <h1 className="title">Booking Report</h1>
        <hr />
      </div>

      <div className="booking-report-table">
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
          onOk={() => setShowAddModal(false)}
          onCancel={() => setShowAddModal(false)}
          okText={"ok"}
          footer={null}
        >
          <ReportBookingView booking={selectedRecord} />
        </Modal>
      </div>
    </div>
  );
}

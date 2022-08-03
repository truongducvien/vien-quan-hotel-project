import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { NavLink } from 'react-router-dom';
import { Table } from 'antd';
import moment from 'moment'
import { Loading } from "../../shared-components/Loading";

import '../../../style/BookingList.scss'
import { fetchBookingDataAction} from '../../../store/slices/bookingSlice'
import { fetchRoomDataAction } from '../../../store/slices/roomSlice'
import BookingSearch from "./BookingSearch";

export default function BookingList () {
   const dispatch = useDispatch()
   const bookings = useSelector(state => state.bookingReducer.bookings)
   const isBookingLoading = useSelector(state => state.bookingReducer.isLoading)

   const [tableData, setTableData] = useState([])
   const [tableDataToShow, setTableDataToShow] = useState([...tableData])

   useEffect(() => {
      dispatch(fetchBookingDataAction());
      dispatch(fetchRoomDataAction())
   }, []); 

   useEffect(()=> {
      let bookedList = bookings.filter( item => item.status === 'Booked')
      let data = bookedList.map( booking => {
         return {
            key: booking.id,
            userFullName: `${booking.userInfo.firstName} ${booking.userInfo.lastName}`,
            phone: booking.userInfo.phone,
            startDay: booking.date.startDay,
            endDay: booking.date.endDay,
            bookingId: booking.id,
         }
      })
      setTableData(data)
      setTableDataToShow(data)
   }, [bookings])


   const handleSearch = (data) => {
      setTableDataToShow(data);
   }

   const columns = [
      {
         title: 'Index',
         dataIndex: "index",
         key: 'index',
         render: (item, obj, index) => (
            <div style={{textAlign: 'center'}}>{index + 1}</div>
         )
      },
      {
         title: 'User Name',
         dataIndex: 'userFullName',
         key: 'userFullName',
         render: (item) => (
            <div style={{textAlign: 'center'}}>{item}</div>
         )
      },
      {
         title: 'Phone Number',
         dataIndex: 'phone',
         key: 'phone',
         render: (item) => (
            <div style={{textAlign: 'center'}}>{item}</div>
         )
      },
      {
         title: 'Booking ID',
         dataIndex: 'bookingId',
         key: 'bookingId',
         render: (item) => (
            <div style={{textAlign: 'center'}}>{item}</div>
         )
      },
      {
         title: 'Check in',
         dataIndex: 'startDay',
         key: 'startDay',
         render: (item) => (
            <div style={{textAlign: 'center'}}>{moment(item).format("MMMM Do YYYY")}</div>
         )
      },
      {
         title: 'Check out',
         dataIndex: 'endDay',
         key: 'endDay',
         render: (item) => (
            <div style={{textAlign: 'center'}}>{moment(item).format("MMMM Do YYYY")}</div>
         )
      },
      {
         title: 'Action',
         key: 'action',
         render: (_, record) => (
            <NavLink to={`detail/${record.bookingId}`} >Detail</NavLink>
         ),
      },
   ];

   return (
      <>
         {isBookingLoading? (
            <Loading />
         ):(
            <div>
               <span>Total: {tableDataToShow.length}</span>

               <BookingSearch 
                  tableData={tableData} 
                  handleSearch={handleSearch}
               />
               <Table 
                  className="bookingListTable"
                  columns={columns} 
                  dataSource={tableDataToShow}
                  size='small' 
               />
            </div>
         )}
      </>
   )
}
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Space, Table, Spin, Modal } from 'antd';
import moment from 'moment'

import { API, API_URL } from "../../../api/constAPI";

import '../../../style/BookingList.scss'
import { 
   fetchBookingDataAction,
   updateBookingAction,
   resetCurrentRoomSelectionAction} from '../../../store/slices/bookingSlice'
import { 
   fetchRoomDataAction, 
   updateRoomsAction } from '../../../store/slices/roomSlice'
import ShowAvailableRooms from "./ShowAvailableRooms";

export default function BookingList () {
   const dispatch = useDispatch()
   const rooms = useSelector(state => state.roomReducer.rooms)
   const bookings = useSelector(state => state.bookingReducer.bookings)
   const currentRoomSelection = useSelector(state => state.bookingReducer.currentRoomSelection)
   const isBookingLoading = useSelector(state => state.bookingReducer.isLoading)

   const [tableData, setTableData] = useState([])

   const [isRoomModalVisible, setIsRoomModalVisible] = useState(false);
   const [availableRooms, setAvailableRooms] = useState([])
   const [currentTypeSelection, setCurrentTypeSelection] = useState('')

   
   useEffect(() => {
      dispatch(fetchBookingDataAction());
      dispatch(fetchRoomDataAction())
   }, []); 

   useEffect(()=> {
      let data = []
      bookings?.forEach(booking => {
         booking?.options.forEach( opt => {
            data = [
               ...data,
               {
                  key: opt.id,
                  userFullName: `${booking.userInfo.firstName} ${booking.userInfo.lastName}`,
                  phone: booking.userInfo.phone,
                  roomTypeId: opt.typeRoomId,
                  typeRoom: opt.typeRoom,
                  roomName: opt.roomName,
                  startDay: booking.date.startDay,
                  endDay: booking.date.endDay,
                  bookingId: booking.id,
                  bookingStatus: opt.status
               }
            ]
         })
      })
      setTableData(data)
   }, [bookings])


   // When the room selection box is closed, reset the currentRoomSelection:
   useEffect(()=> {
      if( !isRoomModalVisible ){
         dispatch(resetCurrentRoomSelectionAction())
      }
   },[isRoomModalVisible])

   const changeBookingStatus = (message, bookingId, optionkey) => {
      API.get(`${API_URL}/bookings/${bookingId}`).then(res => {
         res.data.options.forEach( option => {
            if(option.id === optionkey){
               option.status = message;
            }
         })
         dispatch(updateBookingAction(res.data))
      })
   }


   const updateRooms  = ( status, roomTypeId, roomId, bookingId, userFullName) => {
      API.get(`${API_URL}/rooms/${roomTypeId}`).then(res => {
         res.data.roomsList.forEach( room => {
            if(room.id === roomId){
               room.roomStatus = status;
               room.currentBooking.bookingId = bookingId;
               room.currentBooking.userFullName = userFullName;
            }
         })
         API.patch(`${API_URL}/rooms`, roomTypeId, res.data)  // Update server

         const newRooms = rooms.map( roomType => {
            if( roomType.id === res.data.id){
               return res.data
            } else return roomType
         })
         dispatch(updateRoomsAction(newRooms)) // Update redux store
      })
   }


   // When admin choose a room to check in, save roomName to bookings data:
   const updateBookings = (bookingStatus, roomName, bookingId, optionId) => {
      API.get(`${API_URL}/bookings/${bookingId}`).then( res => {
         res.data.options.forEach( item => {
            if(item.id === optionId){
               item.roomName = roomName;
               item.status = bookingStatus;
            }
         })
         API.patch(`${API_URL}/bookings`, bookingId, res.data) // Update server

         const newBookings = bookings.map( item => {
            if( item.id === res.data.id){
               return res.data;
            } else return item
         })
         dispatch(updateBookingAction(newBookings)) // Update redux store
      })
   }


   // Filter all the current available rooms everytime rooms changed:
   useEffect(()=> {
      const availableRoomsFilter = rooms.map( room => {
         return {
            roomTypeId: room.id,
            roomType: room.typeRoom,
            available: room.roomsList.filter( item => item.roomStatus === 'available')
         }
      })
      setAvailableRooms(availableRoomsFilter)
   },[rooms])


   const handleClickCheckIn = (message, record) => { 
      const now = moment()._d.getTime()
      const offset = record.startDay - now;
      if(offset < 0){
         if(window.confirm("This booking is expired, note Expired?")) {
            updateBookings ('Expired', "", record.bookingId, record.key)
         }
      } else{
         setCurrentTypeSelection(record)
         setIsRoomModalVisible(true);
      }  
   }

   // When click OK from choose room box, update roomStatus and bookingStatus:
   const handleOk = () => {
      if(currentRoomSelection !== ''){
         setIsRoomModalVisible(false);
         // Update change in rooms & bookings data:
         let roomTypeId = currentTypeSelection.roomTypeId;
         let roomId = currentRoomSelection.id;
         let bookingId = currentTypeSelection.bookingId;
         let optionKey = currentTypeSelection.key;
         let userFullName = currentTypeSelection.userFullName;
         let roomName = currentRoomSelection.roomName;
         
         updateRooms('active', roomTypeId, roomId, bookingId, userFullName)
         updateBookings ('Checked-in', roomName, bookingId, optionKey)
      } else {
         alert ('Please choose a room!')
      }
   };

   useEffect(()=> {
      console.log(rooms);
      console.log(bookings);
   }, [rooms, bookings])


   const handleCancel = () => {
      setIsRoomModalVisible(false);
   };


   const handleClickCheckOut = (message, record) => {
      console.log(record);
      let bookingId = record.bookingId;
      let optionId = record.key;
      let roomTypeId = record.roomTypeId;
      if(window.confirm(`Check out for ${record.userFullName}?`)){
         let roomId
         rooms.forEach( roomType => {
            if( roomType.id === roomTypeId){
               roomType.roomsList.forEach( item => {
                  if ( item.roomName === record.roomName){
                     roomId = item.id;
                  }
               })
            }
         })
         updateRooms('available', roomTypeId, roomId, "", "")
         updateBookings ('Checked-out', "", bookingId, optionId)
      }
   }


   const handleClickDelete = (record, bookings) => {
      let bookingId = record.bookingId;
      if(window.confirm(`Delete booking ${record.bookingId}?`)){
         API.get(`${API_URL}/bookings/${bookingId}`).then( res => {   
                     
            API.delete(`${API_URL}/bookings`, bookingId, res.data) // Update server
   
            const newBookings = bookings.map( item => {
               return {
                  ...item,
                  options: item.options.filter( opt => opt.id !== record.key)
               }
            })
            dispatch(updateBookingAction(newBookings)) // Update redux store
         })
      }
   }


   const columns = [
      {
         title: 'Index',
         dataIndex: "index",
         key: 'index',
         render: (item, obj, index) => index + 1
      },
      {
         title: 'User Name',
         dataIndex: 'userFullName',
         key: 'userFullName',
         render: (text) => <a>{text}</a>,
      },
      {
         title: 'Phone Number',
         dataIndex: 'phone',
         key: 'phone',
      },
      {
         title: 'Room Type',
         dataIndex: 'typeRoom',
         key: 'typeRoom',
      },
      {
         title: 'Booking ID',
         dataIndex: 'bookingId',
         key: 'bookingId',
      },
      {
         title: 'Check in',
         dataIndex: 'startDay',
         key: 'startDay',
         render: text => moment(text).format("MMMM Do YYYY")
      },
      {
         title: 'Check out',
         dataIndex: 'endDay',
         key: 'endDay',
         render: text => moment(text).format("MMMM Do YYYY")
      },
      {
         title: 'Status',
         dataIndex: 'bookingStatus',
         key: 'bookingStatus',
         render: text => <><i className={`fa-solid fa-circle status ${text}`}></i><span>{text}</span></>
      },
      {
         title: 'Action',
         key: 'action',
         render: (_, record) => (
            <Space size="middle">
               {record.bookingStatus === 'Booked' &&
                  <button 
                     className="changeStatusButton"
                     onClick={() => handleClickCheckIn('Checked-in', record)} 
                  >Check-in</button>
               }

               {record.bookingStatus === 'Checked-in' &&
                  <button
                     className="changeStatusButton"
                     onClick={() => handleClickCheckOut('Checked-out', record)}
                  >Check-out</button>
               }

               {(record.bookingStatus === 'Checked-out' || record.bookingStatus === 'Expired') &&
                  <button
                     className="changeStatusButton"
                     onClick={() => handleClickDelete(record, bookings)}
                  >Delete</button>
               }
               
            </Space>
         ),
      },
   ];
   

   return (
      <>
         {isBookingLoading? (
            <>
               <br />
               <Space>
                  <Spin size='large'/>
               </Space>
            </>
         ):(
            <div>
                  <Modal 
                     title="Choose room:" 
                     visible={isRoomModalVisible} 
                     onOk={()=>handleOk()} 
                     onCancel={handleCancel}
                  >
                     <ShowAvailableRooms 
                        availableRooms={availableRooms}
                        currentTypeSelection={currentTypeSelection}   
                     />
                  </Modal>

               <span>Booking Total: {tableData.length}</span>
               <Table columns={columns} dataSource={tableData} />
            </div>
         )}
      </>
   )
}
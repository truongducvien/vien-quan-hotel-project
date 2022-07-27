import { useEffect } from "react";
import { Space, Spin, DatePicker } from 'antd';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';

import '../../../style/RoomStatusTable.scss'
import { fetchRoomDataAction } from '../../../store/slices/roomSlice'
import { fetchBookingDataAction } from '../../../store/slices/bookingSlice'
import ShowRoom from "./ShowRoom";

export default function RoomStatusTable () {
   const dispatch = useDispatch()
   const rooms = useSelector(state => state.roomReducer.rooms)
   const isBookingLoading = useSelector(state => state.bookingReducer.isLoading) 
   const roomDefinition = ['Available', 'Active', 'Busy']

   useEffect(() => {
      dispatch(fetchRoomDataAction())
      dispatch(fetchBookingDataAction());
   }, []);

   return (
      <div className="roomStatus">
         <div className="bookingHeader">
            <div className="definition-container">
               {roomDefinition.map((item, index) => (
                  <div key={index} className="definition">
                     <div className={`definitionColor ${item}`}></div>
                     <span>{item}</span>
                  </div>
               ))}
            </div>
         </div>

         {isBookingLoading? (
            <>
               <br /><br />
               <Space>
                  <Spin size='large'/>
               </Space>
         </>
         ):(
            <div className="bookingContent">
               {rooms.map((roomsGroup, index) => (
                  <div className="typeGroup" key={index}>
                     <ShowRoom roomsGroup={roomsGroup}/>
                  </div>
               ) )}
            </div>
         )}
      </div>
   )
}
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import '../../../style/Analysis.scss'

import { fetchRoomDataAction } from '../../../store/slices/roomSlice'
import { fetchBookingDataAction } from '../../../store/slices/bookingSlice'
import { fetchUsersDataAction } from "../../../store/slices/usersSlice";

import Revenue from './Revenue';
import Rooms from './Rooms';
import Users from './Users';
import Bookings from './Bookings'
import { Loading } from "../../shared-components/Loading"

export default function Analysis () {
   const dispatch = useDispatch();

   const rooms = useSelector(state => state.roomReducer.rooms)
   const isRoomsLoading = useSelector(state => state.roomReducer.isLoading)

   const bookings = useSelector(state => state.bookingReducer.bookings)
   const isBookingsLoading = useSelector(state => state.bookingReducer.isLoading)

   const users = useSelector(state => state.usersReducers.users);
   const isUsersLoading = useSelector(state => state.usersReducers.isLoading);

   useEffect(() => {
      dispatch(fetchRoomDataAction());
      dispatch(fetchBookingDataAction());
      dispatch(fetchUsersDataAction());
   }, [])

   return (
      <div className="analysis">
         <div className="analysis-group">
            {isBookingsLoading? (
               <Loading />
            ):(
               <Revenue bookings={bookings}/>
            )}
         </div>

         <div className="analysis-group">
            {isRoomsLoading? (
               <Loading />
            ):(
               <Rooms rooms={rooms}/>
            )}
         </div>

         <div className="analysis-group">
            {isUsersLoading? (
               <Loading />
            ):(
               <Users users={users}/>
            )}
         </div>

         <div className="analysis-group">
            {isBookingsLoading? (
               <Loading />
            ):(
               <Bookings bookings={bookings}/>
            )}
         </div>
      </div>
   )
}

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"

import '../../../style/ShowAvailableRooms.scss'

import { fetchRoomDataAction } from '../../../store/slices/roomSlice'
import { Loading } from "../../shared-components/Loading";


export default function ShowAvailableRooms ({
   availableRooms, 
   currentTypeSelection,
   currentRoomSelection,
   setCurrentRoomSelection}) {

   const [itemToShow, setItemToShow] = useState()
   
   const dispatch = useDispatch()
   const isRoomsLoading = useSelector(state => state.roomReducer.isLoading);

   useEffect(()=> {
      dispatch(fetchRoomDataAction()); 
   }, [])

   useEffect(()=> {
      availableRooms.forEach( item => {
         if(item.roomType === currentTypeSelection.typeRoom){
            setItemToShow(item)
         }
      })
   }, [availableRooms, currentTypeSelection])

   const handleChooseAvailableRoom = (selection) => {
      setCurrentRoomSelection(selection)
   }

   return (
      <div className="availableRooms">
         {isRoomsLoading? (
            <Loading />
         ):(
            <>
               {itemToShow && itemToShow.available.map( room => (
                  <div 
                     key={room.id}
                     className={`availableRoom ${room.roomName === currentRoomSelection.roomName? 'active' : ''}`}
                     onClick={() => handleChooseAvailableRoom(room)}
                  >{room.roomName}</div>
               ))}
            </>
         )}
      </div>
   )
}
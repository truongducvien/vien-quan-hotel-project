import { useState, useEffect } from "react";
import { useDispatch } from "react-redux"

import '../../../style/ShowAvailableRooms.scss'

import { fetchRoomDataAction, updateRooms } from '../../../store/slices/roomSlice'
import { saveCurrentRoomSelectionAction } from '../../../store/slices/bookingSlice'


export default function ShowAvailableRooms ({availableRooms, currentTypeSelection}) {
   const [isSelected, setIsSelected] = useState('')
   const [itemToShow, setItemToShow] = useState()
   
   const dispatch = useDispatch()

   useEffect(()=> {
      dispatch(fetchRoomDataAction())
   }, [])

   useEffect(()=> {
      availableRooms.forEach( item => {
         if(item.roomType === currentTypeSelection.typeRoom){
            setItemToShow(item)
         }
      })
   }, [currentTypeSelection])

   const handleChooseAvailableRoom = (selection) => {
      setIsSelected(selection)
      dispatch(saveCurrentRoomSelectionAction(selection))
   }

   return (
      <div className="availableRooms">
         {itemToShow && itemToShow.available.map( room => (
            <div 
               key={room.id}
               className={`availableRoom ${room.roomName === isSelected.roomName? 'active' : ''}`}
               onClick={() => handleChooseAvailableRoom(room)}
            >{room.roomName}</div>
         ))}
      </div>
   )
}
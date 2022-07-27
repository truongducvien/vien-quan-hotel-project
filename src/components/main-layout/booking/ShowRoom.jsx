import { useState, useEffect } from 'react'
import { Modal } from 'antd';

import '../../../style/ShowRoom.scss'

export default function ShowRoom ({ roomsGroup }){
   const [isModalVisible, setIsModalVisible] = useState(false);
   const [infoShow, setInfoShow] = useState('')

   const handleClick = (room) => {
      setIsModalVisible(true)
      setInfoShow(room)
   }

   const handleOk = () => {
      setIsModalVisible(false)
   }

   const handleCancel = () => {
      setIsModalVisible(false)
   }

   return (
      <>
         <span className="typeTitle">{roomsGroup.typeRoom}</span>
         <div className="room-group">
            {roomsGroup.roomsList.map( room => (
               <div 
                  className={`room ${room.roomStatus}`}
                  key={room.id} 
                  onClick={() => handleClick(room)}
               >
                  <p>{room.roomName}</p>
               </div>
            ))}
         </div>

         {infoShow &&
            <Modal 
               title="Booking Information:" 
               visible={isModalVisible} 
               onOk={handleOk} 
               onCancel={handleCancel}
            >
               {infoShow.currentBooking.bookingId !== ''? (
                  <>
                     <p>Booking ID: {infoShow.currentBooking.bookingId}</p>
                     <p>Customer: {infoShow.currentBooking.userFullName}</p>
                  </>
               ):(
                  <h2>No data</h2>
               )}
            </Modal>
         }
      </>
   )
}

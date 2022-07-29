import { useState } from 'react';
import { v4 as uuid } from 'uuid'

import '../../style/EditForm.scss'

export default function EditForm ({
   roomInfoChange, 
   handleChange, 

   handleDeleteImage, 
   setNewImageLink,
   newImageLink,
   handleAddImage,

   deleteRoom,
   addNewRoom,
}){

   const [roomChecked, setRoomChecked] = useState([])

   const [newRoom, setNewRoom] = useState({
      id: uuid(),
      key: uuid(),
      roomName: '',
      bookedDay: [],
      roomStatus: 'available',
      currentBooking: {
         bookingId: '',
         userFullName: ''
      }
   });

   const handleCheckBoxChange = (e) => {
      if(e.target.checked){
         setRoomChecked([...roomChecked, e.target.value])
      }else{
         let newRoomChecked = roomChecked.filter( item => item !== e.target.value)
         setRoomChecked([...newRoomChecked])
      }
   }

   const handleDeleteRoomButton = () => {
      deleteRoom(roomChecked)
      setRoomChecked([])
   }

   const handleRoomInputChange = (newRoomNane) => {
      setNewRoom({
         ...newRoom, 
         id: uuid(),
         key: uuid(),
         roomName: newRoomNane
      })
   }

   const handleClickAddNewRoom = () => {
      addNewRoom(newRoom)
      setNewRoom({...newRoom, roomName: ''})
   }

   return(
      <>
         <form className='adminEditForm' action=""> 
            <div className='form-group'>
               <div className="input-container roomName">
                  <span>Room type: </span>
                  <input 
                     type="text" 
                     value={roomInfoChange.typeRoom}
                     onChange={(e) => handleChange('typeRoom', e.target.value)}
                  />
               </div>
            </div>

            <div className='form-group'>
               <div className="input-container">
                  <span>Price: </span>
                  <input 
                     type="text"
                     value={roomInfoChange.price}
                     onChange={(e) => handleChange('price', e.target.value)}
                  />
               </div>

               <div className="input-container">
                  <span>Total rooms: </span>
                  <input 
                     type="number" 
                     value={roomInfoChange.quantity}
                     onChange={(e) => handleChange('quantity', e.target.value)}
                  />
               </div>

               <div className="input-container">
                  <span>Max guests: </span>
                  <input 
                     type="number" 
                     value={roomInfoChange.maxPerson}
                     onChange={(e) => handleChange('maxPerson', e.target.value)}
                  />
               </div>
            </div>

            <div className='form-group'>
               <div className="input-container bed">
                  <span>Bed: </span>
                  <input 
                     type="text" 
                     value={roomInfoChange.bed}
                     onChange={(e) => handleChange('bed', e.target.value)}
                  />
               </div>

               <div className="input-container bathrooms">
                  <span>Bathrooms: </span>
                  <input 
                     type="text" 
                     value={roomInfoChange.bathrooms}
                     onChange={(e) => handleChange('bathrooms', e.target.value)}
                  />
               </div>
            </div>

            <div className='form-group'>
               <div className="input-container convenient">
                  <span>Convenient: </span>
                  <textarea
                     rows="4"
                     value={roomInfoChange.convenient}
                     onChange={(e) => handleChange('convenient', e.target.value)}
                  />
               </div>

               <div className="input-container introduction">
                  <span>Introduction: </span>
                  <textarea
                     rows="4"
                     value={roomInfoChange.introduction}
                     onChange={(e) => handleChange('introduction', e.target.value)}
                  />
               </div>
            </div>
         </form>

         <div className="imageForm">
            <div className="image-group">
               {roomInfoChange.imageUrl.map((link, index) => (
                  <div className="image" key={index}>
                     <div className='image-container'>
                        <img src={link} alt=''/>
                     </div>
                     <div className="deleteButton">
                        <i onClick={()=>handleDeleteImage(index)} className="fa-solid fa-circle-xmark"></i>
                     </div>
                  </div>
               ))}
            </div>

            <div className='imageLinkInput'>
               <input 
                  id='enterImageLinkInput'
                  type="text"
                  placeholder='Enter image URL here ...'
                  onChange={e => setNewImageLink(e.target.value)}
                  value={newImageLink}
               />
               <button
                  onClick={handleAddImage}
                  disabled={newImageLink===""? true: false}
               >Add</button>
            </div>
         </div>
            
         <div className='roomsListForm'>
            <p className='roomsListTitle'>Rooms list:</p>

            <div className='rooms-group'>
               {roomInfoChange.roomsList.map((room, index) => (
                  <div className='roomEditList' key={room.id}>
                     <input 
                        type="checkbox" 
                        value={room.id}
                        onChange={e => handleCheckBoxChange(e)}
                     />
                     <span className='roomName'>{room.roomName}</span>
                  </div>
               ))}
            </div>

            <button
               className='deleteRoomButton'
               onClick={handleDeleteRoomButton}
               disabled={roomChecked.length === 0 ? true:false}
            >Delete room</button>

            <div className='roomInput'>
               <input 
                  type="text" 
                  placeholder='Enter name to add new room ...'
                  onChange={e => handleRoomInputChange(e.target.value)}
                  value={newRoom.roomName}
               />
               <button
                  onClick={handleClickAddNewRoom}
                  disabled={newRoom.roomName === ''? true:false}
               >Add</button>
            </div>
         </div>
      </>
   )
}
import { useEffect } from 'react';
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
   setIsValid
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

   const [isRoomTypeValid, setIsRoomTypeValid] = useState(true)
   const [isPriceValid, setIsPriceValid] = useState(true)
   const [isQuantityValid, setIsQuantityValid] = useState(true)
   const [isMaxPersonValid, setIsMaxPersonValid] = useState(true)
   const [isBedValid, setIsBedValid] = useState(true)
   const [isBathRoomValid, setIsBathRoomValid] = useState(true)
   const [isConvenientValid, setIsConvenientValid] = useState(true)
   const [isIntroductionValid, setIsIntroductionValid] = useState(true)
   

   useEffect(() => {
      if(
         isRoomTypeValid && isPriceValid && isQuantityValid && isMaxPersonValid &&
         isBedValid && isBathRoomValid && isConvenientValid && isIntroductionValid) {
            setIsValid(true)
         } else setIsValid(false)
   }, [isRoomTypeValid,isPriceValid, isQuantityValid, isMaxPersonValid, 
      isBedValid, isBathRoomValid, isConvenientValid, isIntroductionValid]);

   const handleOnInputChange = (e, type) => {
      handleChange(type, e.target.value)
      
      // Form Validation:
      const inputVal = e.target.value
      switch (type) {
         case 'typeRoom':
            inputVal !== '' && inputVal!== ' '? setIsRoomTypeValid(true) : setIsRoomTypeValid(false)
            break;
         case 'price':
            inputVal !== '' && !isNaN(inputVal) ? setIsPriceValid(true) : setIsPriceValid(false)
            break;
         case 'quantity':
            inputVal !== '' && inputVal > 0 ? setIsQuantityValid(true) : setIsQuantityValid(false)
            break;
         case 'maxPerson':
            inputVal !== '' && inputVal > 0 ? setIsMaxPersonValid(true) : setIsMaxPersonValid(false)
            break;
         case 'bed':
            inputVal !== '' ? setIsBedValid(true) : setIsBedValid(false)
            break;
         case 'bathrooms':
            inputVal !== '' ? setIsBathRoomValid(true) : setIsBathRoomValid(false)
            break;
         case 'convenient':
            inputVal !== '' ? setIsConvenientValid(true) : setIsConvenientValid(false)
            break; 
         case 'introduction':
            inputVal !== '' ? setIsIntroductionValid(true) : setIsIntroductionValid(false)
            break; 
         default:
            console.log('Invalid type!');  
            break;
      } 
   }

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
                  <div>
                     <input 
                        className={`${isRoomTypeValid? '': 'empty-input'}`}
                        type="text" 
                        value={roomInfoChange.typeRoom}
                        onChange={(e) => handleOnInputChange(e, 'typeRoom')}
                     />
                  <p 
                     className={`error-message ${isRoomTypeValid? '': 'active'}`}
                  >* This is required!</p>
                  </div>
               </div>
            </div>

            <div className='form-group'>
               <div className="input-container">
                  <span>Price (VND): </span>
                  <div>
                     <input 
                        className={`${isPriceValid? '': 'empty-input'}`}
                        type="text"
                        value={roomInfoChange.price}
                        onChange={(e) => handleOnInputChange(e, 'price')}
                     />
                     <p 
                        className={`error-message ${isPriceValid? '': 'active'}`}
                     >* Price seems incorrect!</p>
                  </div>
               </div>

               <div className="input-container">
                  <span>Total rooms: </span>
                  <div>
                     <input 
                        className={`${isQuantityValid? '': 'empty-input'}`}
                        type="number" 
                        value={roomInfoChange.quantity}
                        onChange={(e) => handleOnInputChange(e, 'quantity')}
                     />
                     <p 
                        className={`error-message ${isQuantityValid? '': 'active'}`}
                     >* Wrong!</p>
                  </div>
               </div>

               <div className="input-container">
                  <span>Max guests: </span>
                  <div>
                     <input 
                        className={`${isMaxPersonValid? '': 'empty-input'}`}
                        type="number" 
                        value={roomInfoChange.maxPerson}
                        onChange={(e) => handleOnInputChange(e, 'maxPerson')}
                     />
                     <p 
                        className={`error-message ${isMaxPersonValid? '': 'active'}`}
                     >* Wrong!</p>
                  </div>
               </div>
            </div>

            <div className='form-group'>
               <div className="input-container bed">
                  <span>Bed: </span>
                  <div>
                     <input 
                        className={`${isBedValid? '': 'empty-input'}`}
                        type="text" 
                        value={roomInfoChange.bed}
                        onChange={(e) => handleOnInputChange(e, 'bed')}
                     />
                     <p 
                        className={`error-message ${isBedValid? '': 'active'}`}
                     >* This is required!</p>
                  </div>
               </div>

               <div className="input-container bathrooms">
                  <span>Bathrooms: </span>
                  <div>
                     <input 
                        className={`${isBathRoomValid? '': 'empty-input'}`}
                        type="text" 
                        value={roomInfoChange.bathrooms}
                        onChange={(e) => handleOnInputChange(e, 'bathrooms')}
                     />
                     <p 
                        className={`error-message ${isBathRoomValid? '': 'active'}`}
                     >* This is required!</p>
                  </div>
               </div>
            </div>

            <div className='form-group'>
               <div className="input-container convenient">
                  <span>Convenient: </span>
                  <div>
                     <textarea
                        className={`${isConvenientValid? '': 'empty-input'}`}
                        rows="4"
                        value={roomInfoChange.convenient}
                        onChange={(e) => handleOnInputChange(e, 'convenient')}
                     />
                     <p 
                        className={`error-message ${isConvenientValid? '': 'active'}`}
                     >* This is required!</p>
                  </div>
               </div>

               <div className="input-container introduction">
                  <span>Introduction: </span>
                  <div>
                     <textarea
                        className={`${isIntroductionValid? '': 'empty-input'}`}
                        rows="4"
                        value={roomInfoChange.introduction}
                        onChange={(e) => handleOnInputChange(e, 'introduction')}
                     />
                     <p 
                        className={`error-message ${isIntroductionValid? '': 'active'}`}
                     >* This is required!</p>
                  </div>
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
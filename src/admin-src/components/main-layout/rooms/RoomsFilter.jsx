import { useState, useEffect } from "react";
import '../../../style/BookingSearch.scss'

export default function RoomsFilter ( {tableData, handleFilter} ) {
   const [roomTypeInput, setRoomTypeInput] = useState('')

   const handleRoomTypeChange = (value) => {
      setRoomTypeInput(value)
   } 

   useEffect(() => {
      const newTableData = tableData.filter( 
         item => item.typeRoom.toLowerCase().includes(roomTypeInput.toLowerCase())
         )
         handleFilter(newTableData);
   }, [roomTypeInput])
   

   return (
      <div className="filter-area">
         <div className="filter-group">
            <input 
               type="text" 
               placeholder="Search by room type ..."
               value={roomTypeInput}
               onChange={(e)=>handleRoomTypeChange(e.target.value)}
            />
         </div>
      </div>
   )
}
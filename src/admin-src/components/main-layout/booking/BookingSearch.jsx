import { useState, useEffect } from "react";
import '../../../style/BookingSearch.scss'

export default function BookingSearch ( {tableData, handleSearch} ) {
   const [searchResult, setSearchResult] = useState()
   const [userNameInput, setUserNameInput] = useState('')
   const [bookingIdInput, setBookingIdInput] = useState('')

   const handleUserNameChange = (value) => {
      setUserNameInput(value)
   }

   const handleBookingIdChange = (value) => {
      setBookingIdInput(value)
   }

   useEffect(() => {
      const newTableData1 = tableData.filter( 
         item => item.userFullName.toLowerCase().includes(userNameInput.toLocaleLowerCase())
         )
      const newTableData2 = newTableData1.filter(item => item.bookingId.toString().includes(bookingIdInput))
      handleSearch(newTableData2);
   }, [userNameInput, bookingIdInput])
   

   return (
      <div className="search-area">
         <div className="search-group">
            <input 
               type="text" 
               placeholder="Search by User Name ..."
               value={userNameInput}
               onChange={(e)=>handleUserNameChange(e.target.value)}
            />
         </div>

         <div className="search-group">
            <input 
               type="text" 
               placeholder="Search by Booking ID ..."
               value={bookingIdInput}
               onChange={(e)=>handleBookingIdChange(e.target.value)}
            />
         </div>
      </div>
   )
}
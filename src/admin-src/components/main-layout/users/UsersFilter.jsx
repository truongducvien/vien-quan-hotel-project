import { useState, useEffect } from "react";
import '../../../style/BookingSearch.scss'

export default function UsersFilter ( {tableData, handleFilter} ) {
   const [userNameInput, setUserNameInput] = useState('')
   const [phoneInput, setPhoneInput] = useState('')

   const handleUserNameChange = (value) => {
      setUserNameInput(value)
   }

   const handlePhoneChange = (value) => {
      setPhoneInput(value)
   } 

   useEffect(() => {
      const newTableData1 = tableData.filter( 
         item => 
            item.firstName.toLowerCase().includes(userNameInput.toLowerCase()) ||
            item.lastName.toLowerCase().includes(userNameInput.toLowerCase())
         )
      const newTableData2 = newTableData1.filter(item => item.phone.toString().includes(phoneInput))
      handleFilter(newTableData2);
   }, [userNameInput, phoneInput])
   

   return (
      <div className="search-area">
         <div className="search-group">
            <input 
               type="text" 
               placeholder="Search by user name ..."
               value={userNameInput}
               onChange={(e)=>handleUserNameChange(e.target.value)}
            />
         </div>

         <div className="search-group">
            <input 
               type="text" 
               placeholder="Search by phone number ..."
               value={phoneInput}
               onChange={(e)=>handlePhoneChange(e.target.value)}
            />
         </div>
      </div>
   )
}
import { useState, useEffect } from "react"

export default function Bookings ( {bookings} ) {
   const [finishedBooking, setFinishedBooking] = useState([])

   useEffect(() => {
      const finished = bookings.filter( item => item.status === 'Finished') 
      setFinishedBooking(finished.length)
   }, [bookings])

   return (
      <>
         <div className="analysisTitle">
            <p>Bookings</p>
            <div className="icon">
               <i className="fa-solid fa-check-to-slot"></i>
            </div>
         </div>

         <div className="analysisContent">
            <p><span>Total:</span> {bookings.length}</p>
            <p><span>Finished:</span> {finishedBooking}</p>
         </div>
      </>
   )
}
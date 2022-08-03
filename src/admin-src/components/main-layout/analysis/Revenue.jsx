import { useState, useEffect } from "react";
import { toVND } from "../../../general function";

export default function Revenue ( {bookings} ) {
   const [revenue, setRevenue] = useState(0)

   useEffect(() => {
      let totalRevenue = 0
      bookings.forEach( booking => {
         if( booking.status === "Finished"){
            booking.options.forEach (opt => {
               if( opt.status === 'Checked-out'){
                  totalRevenue += opt.roomPrice * booking.nights
               }
            })
         } 
      })
      setRevenue(totalRevenue);
   }, [bookings]);

   console.log(toVND);

   return (
      <>
         <div className="analysisTitle">
            <p>Revenue</p>
            <div className="icon">
               <i className="fa-solid fa-hand-holding-dollar"></i>
            </div>
         </div>

         <div className="analysisContent">
            <span className="revenuseValue">{toVND(revenue)}</span>
         </div>
      </>
   )
}
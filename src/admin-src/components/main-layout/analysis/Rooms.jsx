import { useEffect, useState } from "react";

export default function Rooms ( {rooms} ) {
   const [totalRooms, setTotalRooms] = useState(0)

   useEffect(() => {
      const count = rooms.reduce( (p,c) => p + c.roomsList.length, 0)
      setTotalRooms(count)
   }, [rooms]);

   return (
      <>
         <div className="analysisTitle">
            <p>Rooms</p>
            <div className="icon">
               <i className="fa-solid fa-house-user"></i>
            </div>
         </div>

         <div className="analysisContent">
            <p> <span>Types: </span> {rooms.length}</p>
            <p> <span>Rooms: </span> {totalRooms}</p>
         </div>
      </>
   )
}
import { useState, useEffect } from "react"

export default function Users ( {users} ) {
   const [adminUsers, setAdminUsers] = useState([])

   useEffect(() => {
      const admin = users.filter( item => item.role === 'admin') 
      setAdminUsers(admin.length)
   }, [users])

   return (
      <>
         <div className="analysisTitle">
            <p>Users</p>
            <div className="icon">
               <i className="fa-solid fa-users"></i>
            </div>
         </div>

         <div className="analysisContent">
            <p><span>Total: </span> {users.length}</p>
            <p><span>Admin: </span> {adminUsers}</p>
         </div>
      </>
   )
}
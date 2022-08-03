import { useEffect, useState } from "react"
import '../../../style/UserEditForm.scss'

export default function UserEditForm ( {currentUserSelection, handleCurrentUserChange} ) {
   const [currentUser, setCurrentUser] = useState( currentUserSelection )

   useEffect(() => {
      setCurrentUser({...currentUserSelection})
   }, [currentUserSelection])

   const handleChangeFirstName = (value) => {
      setCurrentUser(prev => ({...prev, firstName: value}))
   }
   const handleChangeLastName = (value) => {
      setCurrentUser(prev => ({...prev, lastName: value}))
   }
   const handleChangePhone = (value) => {
      setCurrentUser(prev => ({...prev, phone: value}))
   }
   const handleChangeEmail = (value) => {
      setCurrentUser(prev => ({...prev, email: value}))
   }
   const handleChangeRole = (value) => {
      setCurrentUser(prev => ({...prev, role: value}))
   }

   useEffect(() => {
      handleCurrentUserChange(currentUser)
   });

   return (
      <div className="userEditForm">
         <div className="form-group">
            <span>User ID:</span>
            <input 
               type="text" 
               value={currentUser.id}
               disabled
            />
         </div>

         <div className="form-group">
            <span>First name:</span>
            <input 
               type="text" 
               value={currentUser.firstName}
               onChange={(e)=>handleChangeFirstName(e.target.value)}
            />
         </div>

         <div className="form-group">
            <span>Last name:</span>
            <input 
               type="text" 
               value={currentUser.lastName}
               onChange={(e)=>handleChangeLastName(e.target.value)}
            />
         </div>

         <div className="form-group">
            <span>Phone number:</span>
            <input 
               type="text" 
               value={currentUser.phone}
               onChange={(e)=>handleChangePhone(e.target.value)}
            />
         </div>

         <div className="form-group">
            <span>E-mail:</span>
            <input 
               type="text" 
               value={currentUser.email}
               onChange={(e)=>handleChangeEmail(e.target.value)}
            />
         </div>

         <div className="form-group">
            <span>Role:</span>
            <select 
               name="role" 
               id=""
               value={currentUser.role}
               onChange={(e)=>handleChangeRole(e.target.value)}
            >
               <option value="admin">Admin</option>
               <option value="user">User</option>
            </select>
         </div>

         <div className="form-group">
            <span>Secret key:</span>
            <textarea 
               type="text" 
               value={currentUser.password}
               disabled
            />
         </div>
      </div>
   )
}
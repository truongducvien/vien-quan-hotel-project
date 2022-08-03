import { NavLink } from "react-router-dom";

import UsersList from "./UsersList";
import '../../../style/UsersManagement.scss'

export default function UsersManagement () {
   return (
      <div className="usersManagement">
         <div className='backButton-container'>
            <NavLink className='backButton' to='/admin'>
               <i className="fa-solid fa-arrow-left"></i>
            </NavLink>
         </div>
      
         <h3 className="usersTitle">Users management</h3>

         <UsersList />
      </div>
   )
}

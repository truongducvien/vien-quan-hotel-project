import { NavLink } from "react-router-dom";
import { HeaderShare } from "../../shared-components/HeaderShare";

<<<<<<< HEAD
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
=======
export default function UsersManagement() {
  return (
    <>
      <HeaderShare />
      <div className="backButton-container">
        <NavLink className="backButton" to="/">
          <i className="fa-solid fa-arrow-left"></i>
        </NavLink>
      </div>
      
      <h3>Users management</h3>
    </>
  );
>>>>>>> 53da8ceb35ed51f2ca52f7ed5caf561057e5969b
}

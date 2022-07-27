import { NavLink } from "react-router-dom"


export default function UsersManagement () {
   return (
      <>
         <div className='backButton-container'>
            <NavLink className='backButton' to='/'>
               <i className="fa-solid fa-arrow-left"></i>
            </NavLink>
         </div>
      
         <h3>Users management</h3>
      </>
   )
}

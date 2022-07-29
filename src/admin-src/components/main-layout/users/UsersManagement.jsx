import { NavLink } from "react-router-dom";
import { HeaderShare } from "../../shared-components/HeaderShare";

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
}

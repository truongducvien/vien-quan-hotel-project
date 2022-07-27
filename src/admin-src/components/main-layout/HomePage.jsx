import { NavLink } from "react-router-dom";
import "../../style/HomePage.scss";

export default function AdminPage() {
  return (
    <div className="homePage">
      <NavLink className="button" to="/room_management">
        Room management
      </NavLink>
      <NavLink className="button" to="/users_management">
        Users management
      </NavLink>
      <NavLink className="button" to="/booking_management">
        Booking management
      </NavLink>
    </div>
  );
}

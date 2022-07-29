import { NavLink, Routes, Route } from "react-router-dom";
import "../../style/AdminHomePage.scss";
import RoomManagement from "./rooms/RoomManagement";
import EditPage from "./rooms/EditPage";
import AddRoomPage from "./rooms/AddRoomPage";
import UsersManagement from "./users/UsersManagement";
import BookingManagement from "./booking/BookingManagement";

export default function AdminPage() {
  return (
    <div className="adminHomePage">
      <header>
        <div className="adminLogo">
          <div className="headerLogo">The Ocean Villas</div>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
        </div>

        <div className="adminNavLink">
          <NavLink className="button" to="room_management">
            Room management
          </NavLink>
          <NavLink className="button" to="users_management">
            Users management
          </NavLink>
          <NavLink className="button" to="booking_management">
            Booking management
          </NavLink>
        </div>
      </header>

      <div className='backgroundImage'>
        <img src='https://dmaevvtdousx6.cloudfront.net/uploads/2022/03/Hero_1.jpg' alt=""/>
      </div>
      <h2 className='title'>Hotel admin management</h2>

      <div className="adminContent">
        <Routes>
          <Route path="/room_management" element={<RoomManagement/>} />
          <Route path="room_management/edit" element={<EditPage />} />
          <Route path="room_management/new" element={<AddRoomPage />} />

          <Route path="users_management" element={<UsersManagement />} />
          <Route path="booking_management" element={<BookingManagement />} />
        </Routes>
      </div>
    </div>
  );
}

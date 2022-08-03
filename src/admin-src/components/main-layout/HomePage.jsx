import { NavLink, Routes, Route, useNavigate } from "react-router-dom";
import "../../style/AdminHomePage.scss";
import RoomManagement from "./rooms/RoomManagement";
import EditPage from "./rooms/EditPage";
import AddRoomPage from "./rooms/AddRoomPage";
import UsersManagement from "./users/UsersManagement";
import BookingManagement from "./booking/BookingManagement";
import BookingDetail from "./booking/BookingDetail";
import Analysis from "./analysis/Analysis";

export default function AdminPage() {
  const navigate = useNavigate()
  return (
    <div className="adminHomePage">
      <header>
        <div 
          className="adminLogo"
          onClick={()=>navigate('../admin')}
        >
          <div className="headerLogo">The Ocean Villas</div>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
        </div>

        <div className="adminNavLink">
          <NavLink className="button" to="room_management">
            Rooms
          </NavLink>
          <NavLink className="button" to="users_management">
            Users
          </NavLink>
          <NavLink className="button" to="booking_management">
            Bookings
          </NavLink>
          <NavLink className="button" to="analysis">
            Analysis
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
          <Route path="booking_management/detail/:bookingId" element={<BookingDetail />} />

          <Route path="analysis" element={<Analysis />} />
        </Routes>
      </div>

      <div className="home-footer">
        <span>©2022 The Ocean Villas Resort. All Rights Reserved.</span>
      </div>
    </div>
  );
}

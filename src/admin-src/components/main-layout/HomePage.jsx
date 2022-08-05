import { useEffect } from "react";
import { NavLink, Routes, Route, useNavigate } from "react-router-dom";

import "../../style/AdminHomePage.scss";

import RoomManagement from "./rooms/RoomManagement";
import EditPage from "./rooms/EditPage";
import AddRoomPage from "./rooms/AddRoomPage";
import UsersManagement from "./users/UsersManagement";
import BookingManagement from "./booking/BookingManagement";
import BookingDetail from "./booking/BookingDetail";
import Analysis from "./analysis/Analysis";
import UserInfoBox from "../shared-components/UserInfoBox";
import AdminLayout from "./AdminLayout";



export default function AdminPage() {
  const navigate = useNavigate()

  useEffect(() => {
    const userInfo = localStorage.getItem('USER_INFO')
    if(userInfo === null) {
      navigate('../')
    }
  }, [])

  return (
    <div className="adminHomePage"> 
      <header>
        <div className="header-group">
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
              <i className="fa-solid fa-house-user"></i>&nbsp;
              Rooms
            </NavLink>

            <NavLink className="button" to="users_management">
              <i className="fa-solid fa-users"></i>&nbsp;
              Users
            </NavLink>

            <NavLink className="button" to="booking_management">
              <i className="fa-solid fa-check-to-slot"></i>&nbsp;
              Bookings
            </NavLink>

            <NavLink className="button" to="analysis">
              <i className="fa-solid fa-chart-column"></i>&nbsp;
              Analysis
            </NavLink>
          </div>
        </div>

        <div className="header-group">
          <div className="userInfoBox">
            <UserInfoBox />
          </div>
        </div>
      </header>

      <div className="adminContent">
        <Routes>
          <Route path="/" element={<AdminLayout/>} />
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

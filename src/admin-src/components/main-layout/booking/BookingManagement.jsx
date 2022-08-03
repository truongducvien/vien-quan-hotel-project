import { NavLink } from "react-router-dom";

import { Tabs } from "antd";

import "../../../style/BookingManagement.scss";
import BookingList from "./BookingList";
import RoomStatusTable from "./RoomStatusTable";
import CurrentTime from "../../shared-components/CurrentTime";
import { HeaderShare } from "../../shared-components/HeaderShare";

export default function BookingManagement() {
  const { TabPane } = Tabs;

<<<<<<< HEAD
   return (
      <>
         <h3 className="bookingsTitle">Bookings management</h3>

         <div className='backButton-container'>
            <NavLink className='backButton' to='/admin'>
               <i className="fa-solid fa-arrow-left"></i>
            </NavLink>
         </div>
=======
  return (
    <>
      <HeaderShare />
      <div className="backButton-container">
        <NavLink className="backButton" to="/">
          <i className="fa-solid fa-arrow-left"></i>
        </NavLink>
      </div>
>>>>>>> 53da8ceb35ed51f2ca52f7ed5caf561057e5969b

      <div className="bookingManagement">
        <CurrentTime />

        <Tabs defaultActiveKey="1" className="bookingManagementTab">
          <TabPane tab="Booking List" key="1">
            <BookingList />
          </TabPane>
          <TabPane tab="Rooms Status" key="2">
            <RoomStatusTable />
          </TabPane>
        </Tabs>
      </div>
    </>
  );
}

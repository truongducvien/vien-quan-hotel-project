import { NavLink } from "react-router-dom";

import { Tabs } from 'antd';

import '../../../style/BookingManagement.scss'
import BookingList from "./BookingList";
import RoomStatusTable from "./RoomStatusTable";
import CurrentTime from "../../shared-components/CurrentTime";

export default function BookingManagement () {
   const { TabPane } = Tabs;

   return (
      <>
         <h3 className="bookingsTitle">Bookings management</h3>

         <div className='backButton-container'>
            <NavLink className='backButton' to='/admin'>
               <i className="fa-solid fa-arrow-left"></i>
            </NavLink>
         </div>


         <div className="bookingManagement">
            <CurrentTime />
            
            <Tabs defaultActiveKey="1" className='bookingManagementTab'>
               <TabPane 
                  tab="Booking List" 
                  key="1"
               >
                  <BookingList />
               </TabPane>
               <TabPane tab="Rooms Status" key="2">
                  <RoomStatusTable />
               </TabPane>
            </Tabs>
         </div>
      </>
   )  
}
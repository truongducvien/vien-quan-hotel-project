import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { logoutAction } from '../../../stores/slices/user.slice'
import { NavLink, useNavigate } from "react-router";

import { Menu, Button, Dropdown } from "antd";
import '../../style/UserInfoBox.scss'


export default function UserInfoBox() {
   const navigate = useNavigate()
   const dispatch = useDispatch()
   const userInfo = useSelector((state) => state.user.userInfoState);
   
   const onClick = ({ key }) => {
      switch (key) {
         case "2":
            dispatch(logoutAction());
            break;
         default:
            break;
      }
   };

   const menu = (
      <Menu
         onClick={onClick}
         items={[
         {
            label: <button className="logout-button">Logout</button>,
            key: "2",
         },
         ]}
      />
   );


   useEffect(() => {
      if(!userInfo.data){
         navigate('../')
      }
   });

   return (
      <>
         {userInfo.data && 
            <Dropdown overlay={menu}>
               <Button className="user-info-email">
                  <i className="fa-solid fa-user"></i> &nbsp;
                  {userInfo.data.email}
               </Button>
            </Dropdown>
         }
      </>
   )
}

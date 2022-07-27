// import React, { useState } from "react";
// import "./style/payment-page.scss";
// import "antd/dist/antd.css";
// import { Row, Col } from "antd";
// import { Navigate } from "react-router";
// import { Link, NavLink } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { logoutAction } from "../../stores/slices/user.slice";
// import { useEffect } from "react";
// import { PaymentBooking } from "./payment-booking/PaymentBooking";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUser } from "@fortawesome/free-solid-svg-icons";

// function PaymentPage() {
//   const [account, setAccount] = useState({});
//   const dispatch = useDispatch();
//   const handleLogOut = () => {
//     dispatch(logoutAction());
//     localStorage.removeItem("BOOKING_INFO");
//   };

//   useEffect(() => {
//     const userInfoStorage = localStorage.getItem("USER_INFO");
//     if (userInfoStorage === null) {
//       return <Navigate to={"/booking"} />;
//     }
//     setAccount(JSON.parse(userInfoStorage));
//   }, [localStorage.getItem("USER_INFO")]);

//   return (
//     <div className="payment-page">
//       <div className="pay-header">
//         <Row justify="center">
//           <Col xs={2} sm={2} md={1} lg={1}></Col>
//           <Col xs={9} sm={7} md={6} lg={4} className="text-logo">
//             <Link to="/">
//               <p>Ocean Villa </p>
//             </Link>
//           </Col>

//           <Col xs={0} sm={3} md={6} lg={8}></Col>
//           <Col xs={4} sm={5} md={5} lg={5}>
//             <div className="pay-count">
//               {account !== {} && (
//                 <span className="pay-account-name">
//                   <FontAwesomeIcon icon={faUser} className="headerIcon" />{" "}
//                   &nbsp;
//                   {account.firstName} {account.lastName}
//                 </span>
//               )}
//               &nbsp;
//               <NavLink to="/">
//                 <button className="pay-btn-logout" onClick={handleLogOut}>
//                   Logout
//                 </button>
//               </NavLink>
//             </div>
//           </Col>

//           <Col xs={1} sm={1} md={1} lg={1}></Col>
//         </Row>
//       </div>

//       <PaymentBooking />
//     </div>
//   );
// }

// export default PaymentPage;

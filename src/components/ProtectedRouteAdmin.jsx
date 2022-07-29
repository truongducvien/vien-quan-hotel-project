import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export function ProtectedRouteAdmin(props) {
  const { children } = props;
  const userInfo = useSelector((state) => state.user.userInfoState);
  if (userInfo.data) {
    if (userInfo.data.role === "user") {
      return <Navigate to={"/"} />;
    }
  }

  return <>{children}</>;
}

ProtectedRouteAdmin.propTypes = {
  children: PropTypes.element.isRequired,
};

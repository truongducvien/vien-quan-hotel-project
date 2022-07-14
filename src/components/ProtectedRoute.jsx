import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export function ProtectedRoute(props) {
  const { children } = props;
  const userInfo = useSelector((state) => state.user.userInfoState);
  if (!userInfo.data) return <Navigate to={"/booking"} />;

  return <>{children}</>;
}

ProtectedRoute.propTypes = {
  children: PropTypes.element.isRequired,
};

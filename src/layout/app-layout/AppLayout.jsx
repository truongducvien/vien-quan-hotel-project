import PropTypes from "prop-types";
import React from "react";
import "./app-layout.scss";
import { AppHeader } from "./components/Header";

AppLayout.propTypes = {
  children: PropTypes.element,
};

export function AppLayout(props) {
  const { children } = props;
  return (
    <div className="app-layout">
      <AppHeader />
      {children}
    </div>
  );
}

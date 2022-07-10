import React from "react";
import "./style/user-register-login.scss";
import UserRegister from "./UserRegister";
import UserLogin from "./UserLogin";
import { Tabs } from "antd";
import { Outlet } from "react-router";
const { TabPane } = Tabs;

export default function UserRegisterLogin() {
  return (
    <div className="register-login-container">
      <div className="register-login-center">
        <div className="register-login">
          <Tabs defaultActiveKey="1">
            <TabPane tab="Login" key="1">
              <UserLogin />
            </TabPane>
            <TabPane tab="Register" key="2">
              <UserRegister />
            </TabPane>
          </Tabs>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

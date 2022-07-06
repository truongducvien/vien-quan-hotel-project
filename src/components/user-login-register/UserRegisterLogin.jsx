import React from "react";
import { Tabs } from "antd";
import "./style/user-register-login.scss";
import UserRegister from "./UserRegister";
import UserLogin from "./UserLogin";
const { TabPane } = Tabs;

export default function UserRegisterLogin() {
  return (
    <div className="register-login-container">
      <div className="register-login-center">
        <div className="register-login">
          <Tabs defaultActiveKey="1">
            <TabPane tab="Login" key="1" className="r-l-form">
              <UserLogin />
            </TabPane>
            <TabPane tab="Register" key="2" className="r-l-form">
              <UserRegister />
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

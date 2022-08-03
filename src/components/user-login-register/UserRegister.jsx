import React, { useEffect, useState } from "react";
import { Form, Input, Col, Row } from "antd";
import "./style/user-register-login.scss";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Link, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { v4 } from "uuid";
import { registerAction } from "../../stores/slices/user.slice";

function UserRegister() {
  const userInfo = useSelector((state) => state.user.userInfoState);
  const dispatch = useDispatch();

  const validateMessages = {
    required: "This field is required!",
  };

  const onRegister = (values) => {
    values.id = v4();
    values.role = "user";
    dispatch(registerAction(values));
  };

  if (localStorage.getItem("REGISTER") === "register") {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="register-login-container">
      <div className="pay-header">
        <Row>
          <Col xs={1} sm={2} md={3} lg={3}></Col>
          <Col xs={2} sm={2} md={1} lg={1}>
            <Link to="/login">
              <ArrowLeftOutlined />
            </Link>
          </Col>
          <Col xs={9} sm={7} md={6} lg={4} className="text-logo">
            <Link to="/">
              <p>Ocean Villa </p>
            </Link>
          </Col>
        </Row>
      </div>
      <div className="register-login-center">
        <div className="register-login">
          <div className="user-form-contact">
            <Form
              name="complex-form"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              initialValues={{
                remember: true,
              }}
              autoComplete="off"
              validateMessages={validateMessages}
              onFinish={onRegister}
            >
              <legend>
                <h2>Register</h2>
              </legend>
              <Row>
                <Col xs={24} sm={24} md={12} xl={12}>
                  <Form.Item
                    name="firstName"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input size="large" placeholder="First name" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} xl={12}>
                  <Form.Item
                    name="lastName"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input size="large" placeholder="Last name" />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col xs={24} sm={24} md={12} xl={12}>
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input.Password size="large" placeholder="Password" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} xl={12}>
                  <Form.Item
                    name="confirm"
                    dependencies={["password"]}
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        // type: "regexp",
                        // pattern: new RegExp(/\d+/g),
                        // message: "Wrong format!",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }

                          return Promise.reject(
                            new Error("The two passwords do not match!")
                          );
                        },
                      }),
                    ]}
                  >
                    <Input.Password
                      size="large"
                      placeholder="Confirm password"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col xs={24} sm={24} md={12} xl={12}>
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        type: "email",
                        required: true,
                        message: "This is not a valid email!",
                      },
                    ]}
                  >
                    <Input size="large" placeholder="Email" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} xl={12}>
                  <Form.Item
                    name="phone"
                    rules={[
                      {
                        type: "tel",
                        required: true,
                        message: "This is not a valid phone!",
                      },
                    ]}
                  >
                    <Input size="large" placeholder="Phone" />
                  </Form.Item>
                </Col>
              </Row>
              <div className="user-submit-contact">
                <button type="submit" className="user-submit-btn">
                  Register
                </button>
              </div>
              <Row justify="center">
                <span>
                  Already have account? <Link to="/login"> Login</Link>
                </span>
              </Row>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserRegister;

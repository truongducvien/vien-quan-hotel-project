import React, { useContext } from "react";
import { Form, Input, Col, Row } from "antd";
import { CustomerContext } from "../../providers/CustomerContext";
import "./style/user-register-login.scss";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

function UserRegister() {
  const { usersData, setUsersData } = useContext(CustomerContext);

  const validateMessages = {
    required: "This field is required!",
  };

  const onFinish = (registerInfo) => {
    let newUsersData = [
      ...usersData,
      { email: registerInfo.email, password: registerInfo.password },
    ];
    setUsersData(newUsersData);
    localStorage.setItem("USERS-DATA", JSON.stringify(newUsersData));

    usersData.map((user) => {
      if (registerInfo.email === user.email) {
        alert("You have been account with this email. Please Login");
        setUsersData(usersData);
        localStorage.setItem("USERS-DATA", JSON.stringify(usersData));
      } else {
        alert("Success Register. Please Login");
        setUsersData(newUsersData);
        localStorage.setItem("USERS-DATA", JSON.stringify(newUsersData));
      }
    });
  };

  return (
    <div className="register-login-container">
      <div className="pay-header">
        <Row>
          <Col xs={1} sm={2} md={3} lg={3}></Col>
          <Col xs={2} sm={2} md={1} lg={1}>
            <Link to="/booking">
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
              onFinish={onFinish}
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
                        required: true,
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
                  Already have account? <a href="login"> Login</a>
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

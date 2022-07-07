import React from "react";
import { Form, Input, Col, Row, Checkbox } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

export default function UserLogin() {
  const validateMessages = {
    required: "This field is required!",
  };

  const onFinish = (contact) => {
    console.log("Success:", contact);
  };

  return (
    <div className="user-form-contact">
      <Form
        name="complex-form"
        initialValues={{
          remember: true,
        }}
        autoComplete="off"
        validateMessages={validateMessages}
        onFinish={onFinish}
      >
        <Row justify="center">
          <Col xs={22} sm={20} md={18} xl={18}>
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
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                size="large"
                placeholder="Email"
              />
            </Form.Item>
          </Col>
          <Col xs={22} sm={20} md={18} xl={18}>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                size="large"
                placeholder="Password"
              />
            </Form.Item>
          </Col>
          <Col xs={22} sm={20} md={18} xl={18}>
            <Row justify="space-between">
              <Form.Item name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <a href="">Forgot password</a>
            </Row>
          </Col>

          <Col xs={22} sm={20} md={18} xl={18}>
            <div className="user-submit-contact">
              <button type="submit" className="user-submit-btn">
                Login
              </button>
            </div>
          </Col>
          <p>
            Didn't have account? <a href="">Register</a>
          </p>
        </Row>
      </Form>
    </div>
  );
}

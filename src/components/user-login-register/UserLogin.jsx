import React from "react";
import { Form, Input, Col, Row } from "antd";

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
              <Input size="large" placeholder="Email" />
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
              <Input.Password size="large" placeholder="Password" />
            </Form.Item>
          </Col>
          <Col xs={22} sm={20} md={18} xl={18}>
            <div className="user-submit-contact">
              <button type="submit" className="user-submit-btn">
                Login
              </button>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

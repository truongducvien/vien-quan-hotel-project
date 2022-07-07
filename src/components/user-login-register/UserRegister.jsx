import React from "react";
import { Form, Input, Col, Row } from "antd";

function UserRegister() {
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
              <Input.Password size="large" placeholder="Confirm password" />
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
            Already have account? <a href=""> Login</a>
          </span>
        </Row>
      </Form>
    </div>
  );
}

export default UserRegister;

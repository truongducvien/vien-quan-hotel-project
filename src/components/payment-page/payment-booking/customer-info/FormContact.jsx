import React, { useState } from "react";
import { Form, Input, Col, Row, Collapse, Select } from "antd";
import {
  DownOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import "../..//style/pay-form-contact.scss";
import { useContext } from "react";
import { CustomerContext } from "../../../../providers/CustomerContext";
import { useEffect } from "react";

const { Panel } = Collapse;
const { Option } = Select;
const { TextArea } = Input;

function FormContact() {
  const {
    orderInfo,
    setOrderInfo,
    currentPay,
    setCurrentPay,
    userLoginId,
    setUserLoginId,
  } = useContext(CustomerContext);
  const validateMessages = {
    required: "This field is required!",
  };
  const [textareaValue, setTextareaValue] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");

  const handleArrivalTime = (value) => {
    setArrivalTime(`${value}`);
  };

  useEffect(() => {
    let userLoginStorage = localStorage.getItem("USER_INFO");
    if (userLoginStorage !== null) {
      let userLoginAccount = JSON.parse(userLoginStorage);
      setUserLoginId(userLoginAccount.id);
    }
  }, []);

  const onAddUserInfoPay = (contact) => {
    let newUserPay = {
      id: userLoginId,
      email: contact.email,
      firstName: contact.firstName,
      lastName: contact.lastName,
      phone: contact.phone,
      arrivalTime: arrivalTime,
      requests: textareaValue,
    };
    setOrderInfo({ ...orderInfo, userInfo: newUserPay });
    localStorage.setItem("ORDER_INFO", JSON.stringify(orderInfo));

    setCurrentPay(currentPay + 1);
  };

  return (
    <div className="pay-form-contact">
      <Collapse
        defaultActiveKey={["1"]}
        bordered={false}
        expandIcon={({ isActive }) => (
          <DownOutlined rotate={isActive ? 180 : 0} />
        )}
        expandIconPosition="end"
      >
        <Panel header="Your details" key="1">
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
            onFinish={onAddUserInfoPay}
          >
            <Row>
              <Col xs={24} sm={12} md={24} xl={12}>
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
              <Col xs={24} sm={12} md={24} xl={12}>
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
              <Col xs={24} sm={12} md={24} xl={12}>
                <Form.Item
                  name="email"
                  rules={[
                    {
                      type: "email",
                      required: true,
                      message:
                        "This doesn't look like a correct e-mail address",
                    },
                  ]}
                >
                  <Input size="large" placeholder="Email" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={24} xl={12}>
                <Form.Item
                  name="confirm"
                  dependencies={["email"]}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message:
                        "This doesn't look like a correct e-mail address",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("email") === value) {
                          return Promise.resolve();
                        }

                        return Promise.reject(
                          new Error(
                            "This doesn't look like a correct e-mail address"
                          )
                        );
                      },
                    }),
                  ]}
                >
                  <Input size="large" placeholder="Confirm e-mail" />
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col xs={24} sm={12} md={24} xl={12}>
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
              <Col xs={24} sm={12} md={24} xl={12}>
                <p className="pay-form-subtext">
                  Help us ensure a warm welcome and smooth check-in at your
                  arrival.
                </p>
                <Form.Item>
                  <Select
                    name="arrivalTime"
                    size="large"
                    placeholder="Planned arrival time?"
                    onChange={handleArrivalTime}
                  >
                    <Option value="03:00 PM (15:00)">03:00 PM (15:00)</Option>
                    <Option value="04:00 PM (16:00)">04:00 PM (16:00)</Option>
                    <Option value="05:00 PM (17:00)">05:00 PM (17:00)</Option>
                    <Option value="06:00 PM (18:00)">06:00 PM (18:00)</Option>
                    <Option value="07:00 PM (19:00)">07:00 PM (19:00)</Option>
                    <Option value="08:00 PM (20:00)">08:00 PM (20:00)</Option>
                    <Option value="09:00 PM (21:00)">09:00 PM (21:00)</Option>
                    <Option value="10:00 PM (22:00)">10:00 PM (22:00)</Option>
                    <Option value="11:00 PM (23:00)">11:00 PM (23:00)</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <div className="pay-textarea">
              <Collapse
                bordered={false}
                expandIcon={({ isActive }) =>
                  isActive ? <MinusCircleOutlined /> : <PlusCircleOutlined />
                }
              >
                <Panel
                  className="pay-textarea"
                  header="Any personal requests?"
                  key="1"
                >
                  <TextArea
                    value={textareaValue}
                    rows={4}
                    allowClear
                    onChange={(e) => setTextareaValue(e.target.value)}
                  />
                </Panel>
              </Collapse>
            </div>
            <p style={{ color: "#999" }}>
              By proceeding with this booking, I agree to{" "}
              <span
                style={{
                  color: "#066a92",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                {" "}
                Terms of Use
              </span>{" "}
              and{" "}
              <span
                style={{
                  color: "#066a92",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                Privacy Policy
              </span>
              .
            </p>

            <div className="pay-submit-contact">
              <button type="submit" className="pay-submit-btn">
                Continue
              </button>
            </div>
          </Form>
        </Panel>
      </Collapse>
    </div>
  );
}

export default FormContact;

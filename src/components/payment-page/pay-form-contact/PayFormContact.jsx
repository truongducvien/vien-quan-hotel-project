import React from "react";
import { Form, Input, Col, Row, Collapse, Select } from "antd";
import {
  DownOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import "./pay-form-contact.css";

const { Panel } = Collapse;
const { Option } = Select;
const { TextArea } = Input;

function PayFormContact() {
  const validateMessages = {
    required: "This field is required!",
  };

  const onFinish = (contact) => {
    console.log("Success:", contact);
  };
  const onChangeTexArea = (e) => {
    console.log("Change:", e.target.value);
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
            onFinish={onFinish}
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
                defaultActiveKey={["1"]}
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
                  <TextArea rows={4} allowClear onChange={onChangeTexArea} />
                </Panel>
              </Collapse>
            </div>

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

export default PayFormContact;

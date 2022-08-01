import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Form,
  Input,
  Button,
  Spin,
  Tooltip,
  notification,
  DatePicker,
} from "antd";
import TextArea from "antd/lib/input/TextArea";

import { FileDoneOutlined, InfoCircleOutlined } from "@ant-design/icons";

import axios from "axios";
import "./Register.css";

const layout = {
  labelCol: {
    span: 12,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const Register = () => {
  const history = useNavigate();

  const [username, setUsername] = useState("");
  const [contactNo, setContactno] = useState("");
  const [address, setAddress] = useState("");
  const [dateOfBirth, setDateofBirth] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); //additional

  const type = "user";

  const handleChange = (value) => {
    //handle the date picker value
    setDateofBirth(value);
  };

  const registerHandler = async (placement) => {
    // create handler for saving data to the db
    setLoading(true);

    const config = {
      //headers
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        //use axios API
        "/api/auth/register",
        {
          username,
          email,
          password,
          contactNo,
          address,
          dateOfBirth,
          type,
        },
        config
      );

      setTimeout(() => {
        //set a time out
        setLoading(false);
        notification.info({
          message: `Notification`,
          description: "Register Successfully",
          placement,
        });
        history("/login");
      }, 5000); //5seconds timeout
    } catch (error) {
      notification.error({
        message: `Notification`,
        description: error.response.data.error,
        placement,
      });
      setLoading(false);
      setTimeout(() => {}, 5000); //5s
    }
  };

  const [form] = Form.useForm();
  return (
    <>
      <div className="bg-bg-login bg-cover ">
        <div className="container mx-auto">
          <div className="flex justify-center gap-16  w-full">
            <div className=" border-2 bg-neutral-400 bg-shadow rounded-3xl text-center  px-48 register-bg bg-cover mt-10 mb-10">
              <div className="mb-10">
                <div className="mt-20 flex">
                  <div className="">
                    <Form
                      {...layout}
                      form={form}
                      name="control-hooks"
                      onFinish={() => registerHandler("top")}
                    >
                      <div className=" mb-8 font-bold text-5xl font-serif">
                        Sign Up
                      </div>
                      <div className=" -translate-x-52">
                        <Form.Item
                          name="username"
                          label="Username"
                          rules={[
                            {
                              required: true,
                            },
                          ]}
                          initialValue={username}
                        >
                          <Input
                            style={{ width: "450px" }}
                            placeholder="Enter Username"
                            prefix={
                              <FileDoneOutlined className="site-form-item-icon" />
                            }
                            suffix={
                              <Tooltip title="Please Enter Username">
                                <InfoCircleOutlined
                                  style={{ color: "rgba(0,0,0,.45)" }}
                                />
                              </Tooltip>
                            }
                            onChange={(e) => setUsername(e.target.value)}
                          />
                        </Form.Item>
                        <Form.Item
                          name="contact number"
                          label="Contact No"
                          rules={[
                            {
                              required: true,
                              message: "input your Phone Number!",
                            },
                            {
                              min: 10,
                              message:
                                "Phone Number must be minimum 10 characters.",
                            },
                            { max: 10 },
                          ]}
                          initialValue={contactNo}
                        >
                          <Input
                            style={{ width: "450px" }}
                            placeholder="Enter Telephone Number"
                            prefix={
                              <FileDoneOutlined className="site-form-item-icon" />
                            }
                            suffix={
                              <Tooltip title="Enter your phone number ex: 0774258796">
                                <InfoCircleOutlined
                                  style={{ color: "rgba(0,0,0,.45)" }}
                                />
                              </Tooltip>
                            }
                            showCount
                            maxLength={10}
                            onChange={(e) => setContactno(e.target.value)}
                            type="number"
                          />
                        </Form.Item>
                        <Form.Item
                          name="date of birth"
                          label="Date of Birth"
                          rules={[
                            {
                              required: true,
                            },
                          ]}
                        >
                          <DatePicker
                           style={{ width: "450px" }}
                            value={dateOfBirth}
                            onChange={handleChange}
                          />
                        </Form.Item>
                        <Form.Item
                          name="address"
                          label="Address"
                          rules={[
                            {
                              required: true,
                            },
                          ]}
                          initialValue={address}
                        >
                          <TextArea
                            style={{ width: "450px" }}
                            placeholder="Enter Address"
                            onChange={(e) => setAddress(e.target.value)}
                            autoSize={{ minRows: 3, maxRows: 5 }}
                          />
                        </Form.Item>
                        <Form.Item
                          name="email address"
                          label="Email Address"
                          rules={[
                            {
                              required: true,
                            },
                            { type: "email" },
                            { max: 50 },
                          ]}
                          initialValue={email}
                        >
                          <Input
                            style={{ width: "450px" }}
                            placeholder="Enter Email Address"
                            prefix={
                              <FileDoneOutlined className="site-form-item-icon" />
                            }
                            suffix={
                              <Tooltip title="Enter your email ex: example@example.com">
                                <InfoCircleOutlined
                                  style={{ color: "rgba(0,0,0,.45)" }}
                                />
                              </Tooltip>
                            }
                            showCount
                            maxLength={50}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </Form.Item>
                        <Form.Item
                          name="password"
                          label="Password"
                          rules={[
                            {
                              required: true,
                            },
                          ]}
                          initialValue={password}
                        >
                          <Input
                            style={{ width: "450px" }}
                            placeholder="Enter Password"
                            prefix={
                              <FileDoneOutlined className="site-form-item-icon" />
                            }
                            suffix={
                              <Tooltip title="Please Enter Password">
                                <InfoCircleOutlined
                                  style={{ color: "rgba(0,0,0,.45)" }}
                                />
                              </Tooltip>
                            }
                            showCount
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                          />
                        </Form.Item>
                      </div>
                      <Form.Item {...tailLayout}>
                        <div className="flex  px-20 mt-8">
                          {loading ? (
                            <Button
                              label={"SUBMIT"}
                              htmlType="submit"
                              type={"primary"}
                              disabled={loading}
                              icon={<Spin />}
                            >
                              &nbsp;Submiting...
                            </Button>
                          ) : (
                            <Button
                              label={"SUBMIT"}
                              htmlType="submit"
                              type={"primary"}
                              disabled={loading}
                            >
                              SUBMIT
                            </Button>
                          )}
                        </div>
                      </Form.Item>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;

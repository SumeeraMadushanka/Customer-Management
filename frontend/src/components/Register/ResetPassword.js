import React, { useState } from "react";
import { Form, Input, Button, Tooltip } from "antd";
import { useParams } from "react-router-dom";

import { FileDoneOutlined, InfoCircleOutlined } from "@ant-design/icons";

import axios from "axios";

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

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { resetToken } = useParams();

  const resetpasswordHandler = async (placement) => {
    // create handler for saving data to the db

    const config = {
      //headers
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (password !== confirmPassword) {
      //check the password matching
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 5000);

      return setError("Password did not match");
    }

    try {
      const { data } = await axios.put(
        `/api/auth/passwordreset/${resetToken}`,
        { password },
        config
      );

      setSuccess(data.verify);
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000); //5s
    }
  };

  const [form] = Form.useForm();

  return (
    <>
      <div className="bg-bg-login bg-cover h-screen">
        <div className="container mx-auto contact-bg">
          <div className="flex justify-center mt-8 gap-28 mb-10 w-full">
            <div className=" border-2 rounded-3xl px-36 text-center pb-4 mt-10 bg-shadow bg-zinc-300">
              <div className="mb-10">
                <div className="mt-20 flex">
                  <div className=" ">
                    <Form
                      {...layout}
                      form={form}
                      name="control-hooks"
                      onFinish={() => resetpasswordHandler("top")}
                    >
                      <div className=" mb-8 m font-bold text-3xl   ">
                        Reset Password
                      </div>
                      {error && (
                        <span
                          className="badge bg-warning"
                          style={{ color: "blue" }}
                        >
                          {error}
                        </span>
                      )}
                      {success && (
                        <span
                          className="badge bg-success"
                          style={{ color: "green" }}
                        >
                          {success}
                        </span>
                      )}
                      <div className=" -translate-x-52">
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
                              <Tooltip title="Enter Password">
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
                        <Form.Item
                          name="confirm password"
                          label="Confirm Password"
                          rules={[
                            {
                              required: true,
                            },
                          ]}
                          initialValue={confirmPassword}
                        >
                          <Input
                            style={{ width: "450px" }}
                            placeholder="Enter Password"
                            prefix={
                              <FileDoneOutlined className="site-form-item-icon" />
                            }
                            suffix={
                              <Tooltip title="Enter Password">
                                <InfoCircleOutlined
                                  style={{ color: "rgba(0,0,0,.45)" }}
                                />
                              </Tooltip>
                            }
                            showCount
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            type="password"
                          />
                        </Form.Item>
                      </div>
                      <Form.Item {...tailLayout}>
                        <div className="flex  px-20 mt-8">
                          <Button type="primary" htmlType="submit">
                            Confirm
                          </Button>{" "}
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

export default ResetPassword;

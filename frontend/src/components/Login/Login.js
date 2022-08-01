import React, { useState } from "react";
import { Row, Col, Form, Input, Button, Checkbox, Spin } from "antd";
import "./Login.css";

import { LoginOutlined } from "@ant-design/icons";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import ForgetPassword from "./ForgetPassword";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [available, setAvailable] = useState("");
  const [loading, setLoading] = useState(false); //additional
  const [isError, setIsError] = useState(false);

  const history = useNavigate();

  const loginHandler = async (e) => {
    //handler method for login

    setLoading(true);
    setIsError(false); //additional

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "/api/auth/login",
        { username, password },
        config
      );

      localStorage.setItem("authToken", data?.token); //set the browser caching or local storage for globally accessed anywhere in the application
      localStorage.setItem("username", data?.username);
      localStorage.setItem("contactNo", data?.contactNo);
      localStorage.setItem("address", data?.address);
      localStorage.setItem("dateOfBirth", data?.dateOfBirth);
      localStorage.setItem("email", data?.email);
      localStorage.setItem("type", data?.type);
      localStorage.setItem("id", data?.id);

      setTimeout(() => {
        // set a 5seconds timeout for authentication

        if (data.type === "admin") {
          history(`/admin-dashboard/${data.username}`);
        } else {
          history(`/user-dashboard/${data.username}`);
        }

        setLoading(false);
        window.location.reload();
      }, 5000);
    } catch (error) {
      setError(error.response.data.error);
      setAvailable(error.response.data.available);
      setLoading(false);
      setIsError(true);
      setTimeout(() => {
        setError("");
        setAvailable("");
      }, 5000); //5s
    }
  };

  const showPassword = () => {
    //show password method when check box is enabled
    var x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };

  return (
    <>
      <div className="bg-bg-login bg-cover h-screen">
        <div className="login-page">
          <Row>
            <Col className="left-side" xl={15} lg={15} md={24} sm={24}>
              <div className=" border-2 rounded-3xl pb-4 mt-10 bg-shadow bg-zinc-300">
                <div className="left-side-inner-wrap ">
                  <center>
                    {error && (
                      <span style={{ color: "white", background: "orange" }}>
                        {error}
                      </span>
                    )}
                    {available && (
                      <span style={{ color: "white", background: "red" }}>
                        {available}
                      </span>
                    )}
                  </center>
                  <div className="text-block">
                    <h1 className=" text-3xl font-semibold">Login</h1>
                    Log in to your account if you already have an account
                  </div>
                  <Form onFinish={loginHandler}>
                    <label>Username</label>
                    <Input
                      label={"Username"}
                      name={"username"}
                      fieldType={"username"}
                      size={"large"}
                      placeholder="type your username"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <label>Password</label>
                    <Input
                      label={"PASSWORD"}
                      name={"password"}
                      fieldType={"password"}
                      size={"large"}
                      type="password"
                      placeholder="type your password"
                      id="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <Checkbox onClick={showPassword}>Show Password</Checkbox>
                    <br /> <br /> <br />
                    <ForgetPassword />
                    <div className="btn-wrap">
                      <center>
                        {isError && (
                          <small style={{ color: "red" }}>
                            Something went wrong. Please try again later.
                          </small>
                        )}
                        {loading ? (
                          <Button
                            label={"SUBMIT"}
                            className="submit-btn"
                            htmlType="submit"
                            type={"primary"}
                            disabled={loading}
                            icon={<Spin />}
                          >
                            &nbsp;Authenticating...
                          </Button>
                        ) : (
                          <Button
                            label={"SUBMIT"}
                            className="submit-btn"
                            htmlType="submit"
                            type={"primary"}
                            icon={<LoginOutlined />}
                            disabled={loading}
                          >
                            SUBMIT
                          </Button>
                        )}
                      </center>
                    </div>
                  </Form>
                  <NavLink to="/register">
                    <div className=" text-center top-4 text-lg font-semibold hover:text-blue-700 cursor-pointer hover:underline">
                      Don't have an account? Sign Up
                    </div>
                  </NavLink>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default Login;

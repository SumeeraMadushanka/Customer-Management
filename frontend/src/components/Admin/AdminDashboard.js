import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Layout, Menu, Button, Breadcrumb } from "antd";
import {
  CarryOutOutlined,
  UserAddOutlined,
  LogoutOutlined,
  HomeOutlined,
  BarsOutlined,
} from "@ant-design/icons";

import CarouselView from "./CarouselView";

//Customer components
import CustomerDashboard from "./Customer/Customer.";

const { Content, Footer, Sider } = Layout;

const AdminDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const history = useNavigate();
  const location = useLocation();
  const search = window.location.search;

  const params = new URLSearchParams(search);

  const username = localStorage.getItem("username");

  const queryCustomer = params.get("_optCustomer");

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  const { firstName, lastName, contactNo, email, id, type, address, dateOfBirth, authToken } =
    useParams();

  const logoutHandler = () => {
    localStorage.removeItem("firstName", firstName);
    localStorage.removeItem("lastName", lastName);
    localStorage.removeItem("contactNo", contactNo);
    localStorage.removeItem("email", email);
    localStorage.removeItem("address", address);
    localStorage.removeItem("dateOfBirth", dateOfBirth);
    localStorage.removeItem("id", id);
    localStorage.removeItem("type", type);
    localStorage.removeItem("authToken", authToken);
    history("/login");
  };

  const date = new Date();
  const hrs = date.getHours();

  let greet;

  if (hrs < 12) greet = "Good Morning";
  else if (hrs >= 12 && hrs < 17) greet = "Good Afternoon";
  else if (hrs >= 17 && hrs < 19) greet = "Good Evening";
  else greet = "Good Night";


  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
        width="270px"
      >
        <div className="font-bold mt-6 ml-4  text-2xl cursor-pointer flex items-center font-[Poppins] text-sky-600">
          <div className=" text-5xl translate-y-0.5">
            <ion-icon name="logo-edge"></ion-icon>
          </div>
          <span class="ml-3 text-2xl pl-1 text-sky-600 font-serif font-semibold">
            Crown Hotel
          </span>
        </div>
        <Menu
          style={{ marginTop: "20px" }}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={queryCustomer === "customer" ? ["1"] : null}
        >
          <Menu.Item
            key="1"
            icon={<HomeOutlined />}
            className="text-lg"
            onClick={() => {
              history(`/admin-dashboard/${localStorage.getItem("username")}`);
            }}
          >
            Dashboard
          </Menu.Item>
          <Menu.Item icon={<CarryOutOutlined />} disabled className="text-lg">
            Booking
          </Menu.Item>
          <Menu.Item icon={<CarryOutOutlined />} disabled className="text-lg">
            Food
          </Menu.Item>
          <Menu.Item icon={<CarryOutOutlined />} disabled className="text-lg">
            Supplier
          </Menu.Item>
          <Menu.Item icon={<CarryOutOutlined />} disabled className="text-lg">
            Financial
          </Menu.Item>
          <Menu.Item icon={<CarryOutOutlined />} disabled className="text-lg">
            Event
          </Menu.Item>
          <Menu.Item
            key="2"
            icon={<UserAddOutlined />}
            className="text-lg"
            onClick={() => {
              history(
                `/admin-dashboard/${localStorage.getItem(
                  "firstName"
                )}?_optCustomer=customer`
              );
            }}
          >
            Customer Management
          </Menu.Item>
          <Menu.Item icon={<CarryOutOutlined />} disabled className="text-lg">
            Inventry
          </Menu.Item>
          <Menu.Item icon={<CarryOutOutlined />} disabled className="text-lg">
            Delivery
          </Menu.Item>
          <Menu.Item icon={<CarryOutOutlined />} disabled className="text-lg">
            Employee
          </Menu.Item>
        </Menu>
        {collapsed === false ? (
          <center className="my-12">
            <Button
              icon={<LogoutOutlined className="-translate-y-0.5" />}
              onClick={() => logoutHandler()}
            >
              Sign Out
            </Button>
          </center>
        ) : (
          <center className="my-12 hover:rounded-full hover:bg-slate-500 p-4  hover:mx-4">
            <LogoutOutlined
              style={{ color: "white", cursor: "pointer" }}
              className="-translate-y-0.5"
            />
          </center>
        )}
      </Sider>
      <Layout className="site-layout">
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item style={{ fontSize: "20px" }}>
              <div className="flex">
                <div className=" flex gap-6 font-bold font-sans">
                  <div className=" -translate-y-1">
                    <BarsOutlined size="Large" style={{ fontSize: "25px" }} />
                  </div>
                  <div className=" cursor-pointer">Dashboard</div>
                  <div className=" cursor-pointer">Users</div>
                  <div className=" cursor-pointer">Settings</div>
                </div>
                <div className="font-semibold font-sans  translate-x-80 ml-80 bg-gray-600  px-4 rounded-3xl text-orange-500">
                  {username}
                </div>
              </div>
            </Breadcrumb.Item>
          </Breadcrumb>
          <Breadcrumb style={{ margin: "16px 0", fontSize: "14px" }}>
            <Breadcrumb.Item>{greet}</Breadcrumb.Item>
            <Breadcrumb.Item>Admin</Breadcrumb.Item>
          </Breadcrumb>
          {location.pathname ===
            `/admin-dashboard/${localStorage.getItem("username")}` &&
            !queryCustomer && <CarouselView />}
          {queryCustomer === "customer" && <CustomerDashboard />}
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Copyright © {date.getFullYear()} WinMac Computers
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;

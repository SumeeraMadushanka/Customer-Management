import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Layout, Menu, Breadcrumb } from "antd";

import User from "./User";
import About from "../Common/About";
import UserMenu from "../Common/Menu";
import Event from "../Common/Event";
import Rooms from "../Common/Rooms";

//SideBar components
import Hotel from "../SideBarMenu/Hotel";
import Packages from "../SideBarMenu/Packages";
import Gallery from "../SideBarMenu/Gallery";
import Offers from "../SideBarMenu/Offers";
import Apartments from "../SideBarMenu/Aparments";
import Staff from "../SideBarMenu/Staff";
import Contactus from "../SideBarMenu/Contactus";

const { Content, Footer, Sider } = Layout;

const UserDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const history = useNavigate();
  const location = useLocation();
  const search = window.location.search;

  const param = new URLSearchParams(search);

  const queryHotel = param.get("_optHotel");
  const queryPackages = param.get("_optPackages");
  const queryGallery = param.get("_optGallery");
  const queryOffers = param.get("_optOffers");
  const queryApartments = param.get("_optApartments");
  const queryStaff = param.get("_optStaff");
  const queryConatctus = param.get("_optContactUs");

  const queryMenu = param.get("optMenu");
  const queryEvent = param.get("optEvent");
  const queryRooms = param.get("optRooms");
  const queryAbout = param.get("optAbout");

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  const date = new Date();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
        width="270px"
      >
        <Menu
          style={{ marginTop: "80px" }}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={
            queryHotel === "hotel"
              ? ["1"]
              : queryPackages === "package"
              ? ["2"]
              : queryGallery === "gallery"
              ? ["3"]
              : queryOffers === "offers"
              ? ["4"]
              : queryApartments === "apartments"
              ? ["5"]
              : queryStaff === "staff"
              ? ["6"]
              : queryConatctus === "contactus"
              ? ["7"]
              : null
          }
        >
          <Menu.Item
            key="1"
            icon={<ion-icon name="radio-button-on"></ion-icon>}
            className="text-lg"
            onClick={() => {
              history(
                `/user-dashboard/${localStorage.getItem(
                  "username"
                )}?_optHotel=hotel`
              );
            }}
          >
            &nbsp;
            Hotel
          </Menu.Item>
          <Menu.Item
            key="2"
            icon={<ion-icon name="radio-button-on"></ion-icon>}
            className="text-lg"
            onClick={() => {
              history(
                `/user-dashboard/${localStorage.getItem(
                  "username"
                )}?_optPackages=packages`
              );
            }}
          >
            &nbsp;
            Packages
          </Menu.Item>
          <Menu.Item
            key="3"
            icon={<ion-icon name="radio-button-on"></ion-icon>}
            className="text-lg"
            onClick={() => {
              history(
                `/user-dashboard/${localStorage.getItem(
                  "username"
                )}?_optGallery=gallery`
              );
            }}
          >
            &nbsp;
            Gallery
          </Menu.Item>
          <Menu.Item
            key="4"
            icon={<ion-icon name="radio-button-on"></ion-icon>}
            className="text-lg"
            onClick={() => {
              history(
                `/user-dashboard/${localStorage.getItem(
                  "username"
                )}?_optOffers=offers`
              );
            }}
          >
            &nbsp;
            Offers
          </Menu.Item>
          <Menu.Item
            key="5"
            icon={<ion-icon name="radio-button-on"></ion-icon>}
            className="text-lg"
            onClick={() => {
              history(
                `/user-dashboard/${localStorage.getItem(
                  "username"
                )}?_optApartments=apartments`
              );
            }}
          >
            &nbsp;
            Appartments
          </Menu.Item>
          <Menu.Item
            key="6"
            icon={<ion-icon name="radio-button-on"></ion-icon>}
            className="text-lg"
            onClick={() => {
              history(
                `/user-dashboard/${localStorage.getItem(
                  "username"
                )}?_optStaff=staff`
              );
            }}
          >
            &nbsp;
            Staff
          </Menu.Item>
          <Menu.Item
            key="7"
            icon={<ion-icon name="radio-button-on"></ion-icon>}
            className="text-lg"
            onClick={() => {
              history(
                `/user-dashboard/${localStorage.getItem(
                  "username"
                )}?_optContactUs=contactus`
              );
            }}
          >
            &nbsp;
            Contact Us
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}></Breadcrumb>

          {location.pathname ===
            `/user-dashboard/${localStorage.getItem("username")}` &&
            !queryHotel &&
            !queryPackages &&
            !queryGallery &&
            !queryOffers &&
            !queryApartments &&
            !queryStaff &&
            !queryConatctus &&
            !queryMenu &&
            !queryEvent &&
            !queryRooms &&
            !queryAbout && <User />}

          {queryHotel === "hotel" && <Hotel />}
          {queryPackages === "packages" && <Packages />}
          {queryGallery === "gallery" && <Gallery />}
          {queryOffers === "offers" && <Offers />}
          {queryApartments === "apartments" && <Apartments />}
          {queryStaff === "staff" && <Staff />}
          {queryConatctus === "contactus" && <Contactus />}
          {queryMenu === "menu" && <UserMenu />}
          {queryEvent === "event" && <Event />}
          {queryRooms === "rooms" && <Rooms />}
          {queryAbout === "about" && <About />}
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Copyright © {date.getFullYear()} Crown Hotel
        </Footer>
      </Layout>
    </Layout>
  );
};

export default UserDashboard;

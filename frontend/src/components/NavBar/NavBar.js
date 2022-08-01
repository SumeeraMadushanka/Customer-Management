import React, { useState } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { Popover, Button } from "antd";
import "antd/dist/antd.css";

import UserProfile from "../User/UserProfile";
import axios from "axios";
const NavBar = () => {
  let Links = [
    { name: "HOME", link: `/user-dashboard/${localStorage.getItem("username")}` },
    { name: "MENU", link: `/user-dashboard/${localStorage.getItem("username")}?optMenu=menu` },
    { name: "ROOMS", link: `/user-dashboard/${localStorage.getItem("username")}?optRooms=rooms` },
    { name: "EVENT", link: `/user-dashboard/${localStorage.getItem("username")}?optEvent=event` },
    { name: "ABOUT", link: `/user-dashboard/${localStorage.getItem("username")}?optAbout=about` },
  ];

  const { username } = useParams();

  const [open, setOpen] = useState(false);

  const history = useNavigate();

  const logoutHandler = () => {
    localStorage.setItem("authToken", null);
    localStorage.removeItem("username");
    localStorage.removeItem("type");
    localStorage.removeItem("contactNo");
    localStorage.removeItem("address");
    localStorage.removeItem("dateOfBirth");
    localStorage.removeItem("email");
    localStorage.removeItem("id");
    history("/login");
  };

  const deleteHandler = async () => {
    try {
      await axios.delete("/product/delete");
    } catch (error) {}
  };


  const content = (
    <div style={{ width: "2px" }}>
      <div>
        <UserProfile />
      </div>
      <div className="mt-1">
        <Button
          className="w-20"
          onClick={() => {
            logoutHandler();
            deleteHandler();
          }}
        >
          Logout
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {localStorage.getItem("type") === "user" ? (
        <div className="shadow-md w-full  top-0 left-0 z-10">
          <div className="md:flex items-center justify-between bg-zinc-800 py-1 md:px-10 px-7">
            <div className="font-bold -translate-x-7 text-2xl cursor-pointer flex items-center font-[Poppins] text-sky-600">
              <div className=" text-5xl translate-y-0.5">
                <ion-icon name="logo-edge"></ion-icon>
              </div>
              <NavLink
                to={`/user-dashboard/${localStorage.getItem("username")}`}
              >
                <span class="ml-3 text-2xl pl-1 text-sky-600 font-serif font-semibold">
                  Crown Hotel
                </span>
              </NavLink>
            </div>
            <div
              onClick={() => setOpen(!open)}
              className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
            >
              <ion-icon name={open ? "close" : "menu-sharp"}></ion-icon>
            </div>

            <ul
              className={`md:flex font-semibold md:pb-0 mt-3  pb-0 absolute md:static bg-zinc-800  md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-10 transition-all duration-500 ease-in ${
                open ? "top-21 opacity-100" : "top-[-490px]"
              } md:opacity-100`}
            >
              {Links.map((Link) => (
                <li key={Link.name} className="md:ml-2 text-base md:my-0 my-7 -translate-x-64">
                  <NavLink to={Link.link}
                    className=" text-white hover:text-sky-500 hover:bg-gray-700 py-2 hover:py-2 px-4 hover:px-4 hover:rounded-full  duration-500"
                  >
                    {Link.name}
                  </NavLink>
                </li>
              ))}
              <div className=" flex ite">
                <button className="inline-flex items-center bg-sky-600 text-white border-0 py-1 px-3 focus:outline-none hover:bg-black rounded-full text-base mt-4 md:mt-0 translate-x-6">
                  <Popover
                    placement="bottom"
                    content={content}
                    title={`Hello ${username}`}
                    trigger="hover"
                  >
                    My Account
                  </Popover>
                </button>
              </div>
            </ul>
          </div>
        </div>
      ) : (
        <div className="shadow-md w-full  top-0 left-0 z-10">
          <div className="md:flex items-center justify-between bg-zinc-900 py-2 md:px-10 px-7">
            <div className="font-bold -translate-x-7 text-2xl cursor-pointer flex items-center font-[Poppins] text-sky-600">
              <div className=" text-5xl translate-y-0.5">
                <ion-icon name="logo-edge"></ion-icon>
              </div>
              <NavLink to="/">
                <span class="ml-3 text-4xl pl-1 text-sky-600 font-serif font-semibold">
                  Crown Hotel
                </span>
              </NavLink>
            </div>
            <div
              onClick={() => setOpen(!open)}
              className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
            >
              <ion-icon name={open ? "close" : "menu-sharp"}></ion-icon>
            </div>

            <ul>
              <NavLink to="/login">
                <button className="inline-flex items-center bg-red-600 text-white border-0 py-1 px-3 focus:outline-none hover:bg-sky-600 rounded-full text-base mt-4 md:mt-0 translate-x-6">
                  Login
                  <ion-icon name="log-in"></ion-icon>
                </button>
              </NavLink>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;

import React from "react";
import "./Home.scss";
import { Link, useParams } from "react-router-dom";

const Home = () => {
    
  return (
    <div className=" container max-w-full">
      <div className="bg-bg-homepage bg-cover bg-no-repeat h-screen ">
        <div className="hero">
          <center>
            <div id="container">
              <div className=" translate-y-48">
                <Link to="/login">
                  <button className="learn-more my-20" style={{ width: "30%" }}>
                    <span className="circle" aria-hidden="true">
                      <span className="icon arrow"></span>
                    </span>
                    <h1 className="button-text -translate-y-2">Get Started</h1>
                  </button>
                </Link>
              </div>
            </div>
          </center>
        </div>
      </div>
    </div>
  );
};

export default Home;

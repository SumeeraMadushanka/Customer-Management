import React from "react";
import { Carousel } from "antd";

import "antd/dist/antd.css";

import bg1 from "../Assets/User/bg1.jpg";
import bg2 from "../Assets/User/bg2.jpg";
import bg3 from "../Assets/User/bg3.jpg";
import bg4 from "../Assets/User/bg4.jpg";
import bg5 from "../Assets/User/bg5.jpg";

import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
// ..
AOS.init();

const CarouselView = () => {
  return (
    <>
      <section>
        <Carousel autoplay>
          <div>
            <img src={bg1} />
          </div>
          <div>
            <img src={bg2} />
          </div>
          <div>
            <img src={bg3} />
          </div>
          <div>
            <img src={bg4} />
          </div>
          <div>
            <img src={bg5} />
          </div>
        </Carousel>
      </section>
    </>
  );
};

export default CarouselView;

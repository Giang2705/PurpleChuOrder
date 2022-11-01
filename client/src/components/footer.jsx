import React from "react";
import { Link } from "react-router-dom";
import Logo from "./icon/logo.png";
import Facebook from "./icon/facebook.svg";
import Shopee from "./icon/s-solid.svg";
import Phone from "./icon/phone-solid.svg";
import Location from "./icon/location-dot-solid.svg";
import Time from "./icon/clock-solid.svg";

const Footer = () => {
  return (
    <footer>
      <div className="listInformation">
        <ul>
          <li>
            <span>
              <img src={Facebook} alt="" />
            </span>
            <Link to="/">facebook.com/purplechuorder</Link>
          </li>
          <li>
            <span>
              <img src={Shopee} alt="" />
            </span>
            <Link to="/">Purple Chu / Chichunhaque</Link>
          </li>
          <li>
            <span>
              <img src={Phone} alt="" />
            </span>
            <Link to="/">0798724457</Link>
          </li>
          <li>
            <span>
              <img src={Location} alt="" />
            </span>
            <Link to="/">
              453/32 Nguyễn Đình Chiểu, Phường 5, Quận 3, TPHCM
            </Link>
          </li>
          <li>
            <span>
              <img src={Time} alt="" />
            </span>
            <Link to="/">
              09:00AM - 04:00PM
            </Link>
          </li>
        </ul>
      </div>
      <img src={Logo} alt="" />
    </footer>
  );
};

export default Footer;

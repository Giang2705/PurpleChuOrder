import React from "react";
import Logo from "./icon/logo.png";
import { BsFacebook } from "react-icons/bs";
import { FaShopify } from "react-icons/fa";
import { BiPhoneCall } from "react-icons/bi";
import { GoLocation } from "react-icons/go";
import { BsClock } from "react-icons/bs";

const Footer = () => {
  return (
    <footer>
      <div className="listInformation">
        <ul>
          <li>
            <span>
              <BsFacebook className="icon" />
            </span>
            <a href="http://facebook.com/purplechuorder" target="_blank" rel="noopener">facebook.com/purplechuorder</a>
          </li>
          <li>
            <span>
              <FaShopify className="icon" />
            </span>
            <a href="https://shopee.vn/chichunhaque" target="_blank" rel="noopener">Purple Chu / Chichunhaque</a>
          </li>
          <li>
            <span>
              <BiPhoneCall className="icon" />
            </span>
            <a href="tel: 0798724457">0798724457</a>
          </li>
          <li>
            <span>
              <GoLocation className="icon" />
            </span>
            <a href="https://goo.gl/maps/Hqza24FMTXcj2p9v8" target="_blank" rel="noopener">
              453/32 Nguyễn Đình Chiểu, Phường 5, Quận 3, TPHCM
            </a>
          </li>
          <li>
            <span>
              <BsClock className="icon" />
            </span>
            <a href="/">
              09:00AM - 04:00PM
            </a>
          </li>
        </ul>
      </div>
      <img src={Logo} alt="" />
    </footer>
  );
};

export default Footer;

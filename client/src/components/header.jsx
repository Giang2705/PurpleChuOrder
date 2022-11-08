import React, { useContext, useState } from "react";
import { GlobalState } from "../GlobalState";
import { AiOutlineMenu } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { TfiShoppingCartFull } from "react-icons/tfi";
import { Link } from "react-router-dom";
import axios from "axios";

const Header = () => {
  const state = useContext(GlobalState);

  const [isLogged, setIsLogged] = state.userAPI.isLogged;
  const [isAdmin, setIsAdmin] = state.userAPI.isAdmin;
  const [menu, setMenu] = useState(false);
  const [cart] = state.userAPI.cart;
  const [inquiries] = state.userAPI.inquiries;
  const [allInquiries] = state.inquiriesAPI.inquiries;

  const logoutUser = async () => {
    await axios.get("/user/logout");
    localStorage.clear();
    setIsAdmin(false);
    setIsLogged(false);
  };

  const countHandle = (array) => {
    let len = 0;
    for (let index = 0; index < array.length; index++) {
      if (array[index].status !== "Đã trả lời") {
        len += 1;
      }
    }

    return len;
  };

  const countAnswered = (array) => {
    let len = 0;
    for (let index = 0; index < array.length; index++) {
      if (array[index].status === "Đã trả lời") {
        len += 1;
      }
    }

    return len;
  };

  const styleMenu = {
    left: menu ? 0 : "-100%",
  };

  return (
    <header>
      <div onClick={() => setMenu(!menu)}>
        <AiOutlineMenu width={30} className="menu" />
      </div>

      <div className="logo">
        <h1>
          <Link to="/">{isAdmin ? "Admin" : "PURPLE CHU"}</Link>
        </h1>
      </div>

      <ul style={styleMenu}>
        <li>
          <Link to="/">Trang chủ</Link>
        </li>
        <li>
          <Link to="/products">Album / MD</Link>
        </li>
        <li>
          {isAdmin ? (
            <Link to="/category">Thêm mặt hàng</Link>
          ) : (
            <Link to="/contact">CS Center</Link>
          )}
        </li>

        {isAdmin ? (
          <li>
            {" "}
            <Link to="/create-product">Thêm sản phẩm</Link>{" "}
          </li>
        ) : null}

        <li>
          {isAdmin ? (
            <Link to="/history">Đơn đặt hàng</Link>
          ) : isLogged ? (
            <Link to="/history">Lịch sử đặt hàng</Link>
          ) : null}
        </li>

        <li>
          <div className="qna-header">
            {isLogged ? (
              <div>
                {isAdmin && countHandle(allInquiries) !== 0 ? (
                  <span>{countHandle(allInquiries)}</span>
                ) : countHandle(inquiries) !== 0 ? (
                  <span className="notAnswered">{countHandle(inquiries)}</span>
                ) : null}
                {countAnswered(inquiries) !== 0 ? (
                  <span className="answered">{countAnswered(inquiries)}</span>
                ) : null}
                <Link to="/qna">Thắc mắc/ Giải đáp</Link>
              </div>
            ) : null}
          </div>
        </li>

        <li>
          {isLogged ? (
            <Link to="/" onClick={logoutUser}>
              Đăng xuất
            </Link>
          ) : (
            <Link to="/login">Đăng nhập</Link>
          )}
        </li>

        {isAdmin || !isLogged ? null : (
          <li className="cart-icon">
            <span>{cart.length}</span>
            <Link to="/cart">
              <TfiShoppingCartFull className="cart" />
            </Link>
          </li>
        )}

        {menu ? (
          <li onClick={() => setMenu(!menu)}>
            <AiOutlineClose width={30} className="close" />
          </li>
        ) : null}
      </ul>
    </header>
  );
};

export default Header;

import React, {useState, useContext} from 'react'
import {GlobalState} from "../GlobalState"
import Menu from "./icon/bars-solid.svg"
import Close from "./icon/xmark-solid.svg"
import Cart from "./icon/cart-shopping-solid.svg"
import {Link} from "react-router-dom"

const Header = () => {
  const value = useContext(GlobalState)
  return (
    <header>
      <div className="menu">
        <img src={Menu} alt="" width={30}/>
      </div>

      <div className="logo">
        <h1>
          <Link to="/">Purple Chu Order</Link>
        </h1>
      </div>

      <ul>
        <li><Link to="/">Trang chủ</Link></li>
        <li><Link to="/products">Sản phẩm</Link></li>
        <li><Link to="/about">Giới thiệu</Link></li>
        <li><Link to="/contact">Liên hệ</Link></li>
        <li><Link to="/login">Đăng nhập</Link></li>

        <li>
          <img className='menu' src={Close} alt="" width={30}/>
        </li>
      </ul>

      <div className="cart-icon">
        <span>0</span>
        <Link to="/cart">
          <img src={Cart} alt="" width={30}/>
        </Link>
      </div>
    </header>
  )
}

export default Header;
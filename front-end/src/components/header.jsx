import React, {useState, useContext} from 'react'
import {GlobalState} from "../GlobalState"
import Menu from "./icon/bars-solid.svg"
import Close from "./icon/xmark-solid.svg"
import Cart from "./icon/cart-shopping-solid.svg"
import {Link} from "react-router-dom"
import axios from 'axios'

const Header = () => {
  const state = useContext(GlobalState)

  const [isLogged, setIsLogged] = state.userAPI.isLogged
  const [isAdmin, setIsAdmin] = state.userAPI.isAdmin

  const logoutUser = async () => {
    await axios.get('/user/logout')
    localStorage.clear()
    setIsAdmin(false)
    setIsLogged(false)
  }

  return (
    <header>
      <div className="menu">
        <img src={Menu} alt="" width={30}/>
      </div>

      <div className="logo">
        <h1>
          <Link to="/">{isAdmin ? 'Admin': 'Purple Chu Order'}</Link>
        </h1>
      </div>

      <ul>
        <li><Link to="/">Trang chủ</Link></li>
        <li><Link to="/products">Sản phẩm</Link></li>
        <li>{isAdmin ? <Link to='/category'>Thêm mặt hàng</Link> : <Link to='/about'>Giới thiệu</Link>}</li>
        <li>{isAdmin ? <Link to='/'>Thêm sản phẩm</Link> : <Link to='/contact'>Liên hệ</Link>}</li>
        <li>{isAdmin ? <Link to='/'>Đơn đặt hàng</Link> : isLogged ? <Link to='/history'>Lịch sử đặt hàng</Link> : null}</li>
        <li>{isAdmin ? <Link to='/'>Yêu cầu</Link> : null}</li>

        <li>{isLogged ? <Link to='/' onClick={logoutUser}>Đăng xuất</Link> : <Link to="/login">Đăng nhập</Link>}</li>


        <li>
          <img className='menu' src={Close} alt="" width={30}/>
        </li>
      </ul>

      {
        (isAdmin || !isLogged) ? '' : 
        <div className="cart-icon">
          <span>0</span>
          <Link to="/cart">
            <img src={Cart} alt="" width={30}/>
          </Link>
        </div>
      }
    </header>
  )
}

export default Header;
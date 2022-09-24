import React from 'react'
import {Routes, Route} from "react-router-dom"
import Landing from './landingPage/Landing'
import ProductsListPage from './products/ProductsListPage'
import Login from './auth/Login'
import Register from './auth/Register'
import AboutUs from './about/AboutUs'
import Contact from './contact/Contact'
import Cart from './cart/Cart'
import NotFounded from '../utils/NotFounded/NotFounded'

const Homepage = () => {
  return (
    <Routes>
      <Route path="/" exact element={<Landing />}/>
      <Route path="/products" exact element={<ProductsListPage />}/>
      <Route path="/login" exact element={<Login />}/>
      <Route path="/register" exact element={<Register />}/>
      <Route path="/cart" exact element={<Cart />}/>
      <Route path="/about" exact element={<AboutUs />}/>
      <Route path="/contact" exact element={<Contact />}/>
      <Route path="*" exact element={<NotFounded />}/>
    </Routes>
  )
}

export default Homepage
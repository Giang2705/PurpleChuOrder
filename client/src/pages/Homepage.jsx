import React from 'react'
import {Routes, Route} from "react-router-dom"
import Landing from './landingPage/Landing'
import ProductsListPage from './products/ProductsListPage'
import Login from './auth/Login'
import Register from './auth/Register'
import Contact from './contact/Contact'
import Cart from './cart/Cart'
import NotFounded from '../utils/NotFounded/NotFounded'
import ProductDetail from './products/ProductDetail'
import Category from './category/Category'
import CreateProduct from './products/CreateProduct'
import OrderHistory from './orderHistory/OrderHistory'
import OrderDetail from './orderHistory/OrderDetail'
import QnA from './QnA/QnA'
import QnADetails from './QnA/QnADetails'
import Checkout from './checkout/Checkout'


const Homepage = () => {
  
  return (
    <Routes>
      <Route path="/" exact element={<Landing />}/>
      <Route path="/products" exact element={<ProductsListPage />}/>
      <Route path="/detail/:id" exact element={<ProductDetail />}/>
      <Route path="/login" exact element={<Login />}/>
      <Route path="/register" exact element={<Register />}/>
      <Route path="/cart" exact element={<Cart />}/>
      <Route path="/checkout" exact element={<Checkout />}/>
      <Route path="/contact" exact element={<Contact />}/>
      <Route path='/qna' exact element={<QnA />}/>
      <Route path='/qna/:id' exact element={<QnADetails />}/>

      <Route path='/history' exact element={<OrderHistory />}/>
      <Route path='/history/:id' exact element={<OrderDetail />}/>

      <Route path="/category" exact element={<Category />}/>
      <Route path="/create-product" exact element={<CreateProduct />}/>
      <Route path="/edit_product/:id" exact element={<CreateProduct />} />


      <Route path="*" exact element={<NotFounded />}/>
    </Routes>
  )
}

export default Homepage
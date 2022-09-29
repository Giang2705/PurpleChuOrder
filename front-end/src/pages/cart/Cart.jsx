import React, { useContext, useState, useEffect } from "react";
import { GlobalState } from "../../GlobalState";
import ImageSlider from "../../utils/ImageSlider/ImageSlider";
import { Link } from "react-router-dom";

const Cart = () => {
  const state = useContext(GlobalState);
  const [cart, setCart] = state.userAPI.cart;
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const getTotal = () => {
      const total = cart.reduce((prev, item) => {
        return prev + (item.price * item.quantity)
      }, 0)
      setTotal(total)
    }

    getTotal()
  }, [cart])

  const increment = (id) => {
    cart.forEach(item => {
      if(item._id === id){
        item.quantity += 1
      }
    })

    setCart([...cart])
  }

  const decrement = (id) => {
    cart.forEach(item => {
      if(item._id === id){
        item.quantity === 1 ? item.quantity = 1: item.quantity -= 1
      }
    })

    setCart([...cart])
  }

  const removeProduct = (id) => {
    if(window.confirm("Bạn muốn xóa sản phẩm khỏi giỏ hàng?")){
      cart.forEach((item, index) => {
        if(item._id === id){
          cart.splice(index, 1)
        }
      })

      setCart([...cart])
    }
  }

  if (cart.length === 0) {
    return (
      <h2 style={{ textAlign: "center", fontSize: "5rem" }}>Giỏ hàng rỗng</h2>
    );
  }
  return (
    <div className="cart_container">
      {cart.map(product => {
        return (
        <div key={product._id} className="detail cart">
          <div className="slider img">
            <ImageSlider slides={product.images} />
          </div>
          <div className="box-detail inCart">
            <div className="row">
              <h2>{product.name}</h2>
              <h5>ID: {product.product_id}</h5>
            </div>
            <h3>Giá: {product.price*product.quantity} VND</h3>
            <div className="amount">
              <button onClick={() => decrement(product._id)}> - </button>
              <span>{product.quantity}</span>
              <button onClick={() => increment(product._id)}> + </button>
            </div>

            <div onClick={() => removeProduct(product._id)} className="deleteCart">
              X
            </div>
          </div>
        </div>
        )
      })}

      <div className="total">
        <h3>Total: {total} VND</h3>
        <Link to="#!">Thanh toán</Link>
      </div>
    </div>
  );
};

export default Cart;

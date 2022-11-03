import React, { useContext, useState, useEffect } from "react";
import { GlobalState } from "../../GlobalState";
import ImageSlider from "../../utils/ImageSlider/ImageSlider";
import { Link } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import { userRequest } from "../../requestMethod";
import axios from "axios";

const KEY = process.env.REACT_APP_STRIPE;

const Cart = () => {
  const state = useContext(GlobalState);
  const [cart, setCart] = state.userAPI.cart;
  const [total, setTotal] = useState(0);
  const [token] = state.token;
  const [callback, setCallback] = state.userAPI.callback;
  const [userID] = state.userAPI.id;
  const [stripeToken, setStripeToken] = useState(null);

  useEffect(() => {
    const getTotal = () => {
      const total = cart.reduce((prev, item) => {
        return prev + item.price * item.quantity;
      }, 0);
      setTotal(total);
    };

    const makeRequest = async () => {
      await userRequest.post("/api/payment", {
        user_id: userID,
        tokenId: stripeToken.id,
        amount: total,
        name: stripeToken.card.name,
        email: stripeToken.email,
        address:
          stripeToken.card.address_line1 +
          ", " +
          stripeToken.card.address_city +
          ", " +
          stripeToken.card.address_country,
        cart: cart,
      });
    };

    getTotal();
    if (cart.length !== 0){
      stripeToken && makeRequest();
    }

    if (cart.length !== 0 && stripeToken !== null){  
      setCart([]);
      alert("Thanh toán thành công!");
    }

    addToCart();
    setCallback(!callback)
  }, [cart, stripeToken, cart.total, total]);

  const addToCart = async () => {
    await axios.patch(
      "/user/addcart",
      { cart },
      {
        headers: { Authorization: token },
      }
    );
  };

  const increment = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity += 1;
      }
    });

    setCart([...cart]);
    addToCart();
  };

  const decrement = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity === 1 ? (item.quantity = 1) : (item.quantity -= 1);
      }
    });

    setCart([...cart]);
    addToCart();
  };

  const removeProduct = (id) => {
    if (window.confirm("Bạn muốn xóa sản phẩm khỏi giỏ hàng?")) {
      cart.forEach((item, index) => {
        if (item._id === id) {
          cart.splice(index, 1);
        }
      });

      setCart([...cart]);
      addToCart();
    }
  };

  const onToken = (token) => {
    setStripeToken(token);
  };

  if (cart.length === 0) {
    return (
      <h2 style={{ textAlign: "center", fontSize: "5rem" }}>Giỏ hàng rỗng</h2>
    );
  }
  return (
    <div className="cart_container">
      {cart.map((product) => {
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
              <h3>Giá: {product.price * product.quantity} VND</h3>
              <div className="amount">
                <button onClick={() => decrement(product._id)}> - </button>
                <span>{product.quantity}</span>
                <button onClick={() => increment(product._id)}> + </button>
              </div>

              <div
                onClick={() => removeProduct(product._id)}
                className="deleteCart"
              >
                X
              </div>
            </div>
          </div>
        );
      })}

      <div className="total">
        <h3>Total: {total} VND</h3>
        <StripeCheckout
          name="Purple Chu Order"
          billingAddress
          shippingAddress
          description={`Tổng hóa đơn cần thanh toán: ${total}` + " $"}
          amount={total * 1000}
          token={onToken}
          stripeKey={KEY}
          currency="USD"
        >
          <Link>Thanh toán</Link>
        </StripeCheckout>
      </div>
    </div>
  );
};

export default Cart;

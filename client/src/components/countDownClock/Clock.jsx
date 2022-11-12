import axios from "axios";
import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalState } from "../../GlobalState";

const Clock = () => {
  const state = useContext(GlobalState);
  const [token] = state.token;

  const [cart, setCart] = state.userAPI.cart;

  const [time, setTime] = useState("");
  const navigate = useNavigate();

  const addToCart = async () => {
    await axios.patch(
      "/user/addcart",
      { cart },
      {
        headers: { Authorization: token },
      }
    );
  };

  useEffect(() => {
    let countDownTime = 600;

    let lastTime = localStorage.getItem("saved_time");
    if (lastTime == null) {
      const saved_time = new Date().getTime() + countDownTime * 1000;
      localStorage.setItem("saved_time", saved_time);
      lastTime = saved_time;
    }

    let x = setInterval(function () {
      let now = new Date().getTime();

      let distance = lastTime - now;

      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

      let seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTime(
        (minutes > 9 ? minutes : "0" + minutes) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds)
      );

      if (distance < 0) {
        clearInterval(x);
        localStorage.removeItem("saved_time");
        cart.forEach((item, index) => {
          cart.splice(index, 1);
        });

        setCart([...cart]);
        addToCart();
        navigate("/cart");
        // setTimeout(() => {
        //     setCountDown(false)
        // }, )
      }
    }, 1000);
  }, []);

  return <div style={style}>{time}</div>;
};

const style = {
  fontSize: "100px",
  margin: "0 auto",
  padding: "10px 40px",
  border: "3px solid red",
  width: "fit-content",
  borderRadius: "10px"
};

export default Clock;

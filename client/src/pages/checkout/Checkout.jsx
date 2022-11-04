import React, { useContext, useState } from "react";
import { GlobalState } from "../../GlobalState";

const Checkout = () => {
  const state = useContext(GlobalState);
  const [cart, setCart] = state.userAPI.cart;

  console.log(cart);
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Sản phẩm</th>
            <th>Số lượng</th>
            <th>Tổng cộng</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => {
            return (
              <>
                <tr key={item._id}>
                  <td>
                    <img src={item.images[0].url} alt="" />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>
                    {(item.price * item.quantity)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>

      <div className="total">
        <h3>
          Tổng cộng:{" "}
          {cart.total} VND
        </h3>
      </div>
    </div>
    //             <h3>Tổng cộng: ${total} VND</h3>
  );
};

export default Checkout;

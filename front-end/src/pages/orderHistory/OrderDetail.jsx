import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { GlobalState } from "../../GlobalState";

const OrderDetail = () => {
  const state = useContext(GlobalState);
  const [history] = state.userAPI.history;
  const [orderDetail, setOrderDetail] = useState([]);
  const [btnEdit, setBtnEdit] = useState(false);

  const params = useParams();

  useEffect(() => {
    if (params.id) {
      history.forEach((item) => {
        if (item._id === params.id) setOrderDetail(item);
      });
    }
  }, [params.id, history]);

  console.log(orderDetail);

  useEffect(() => {
    if (orderDetail.status === "Đang xử lý") {
      setBtnEdit(true)
    }
  }, [orderDetail.status]);

  if (orderDetail.length === 0) return null

  return (
    <div className="history-page">
      <table>
        <thead>
          <tr>
            <th>Tên người dùng</th>
            <th>Địa chỉ</th>
            <th>Email</th>
            <th>Trạng thái</th>
            <th>Chỉnh sửa</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{orderDetail.name}</td>
            <td>{orderDetail.address}</td>
            <td>{orderDetail.email}</td>
            <td>{orderDetail.status}</td>
            {
              btnEdit ? <td><button className="btnEdit">Chỉnh sửa</button></td> : <td><button className="btnEditDisabled" disabled>Chỉnh sửa</button></td>
            }
          </tr>
        </tbody>
      </table>

      <table style={{ margin: "30px auto" }}>
        <thead>
          <tr>
            <th></th>
            <th>Sản phẩm</th>
            <th>Số lượng</th>
            <th>Tổng cộng</th>
          </tr>
        </thead>
        <tbody>
          {orderDetail.cart.map(item => (
            <tr key={item._id}>
              <td><img src={item.images[0].url} alt="" /></td>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.price*item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderDetail;

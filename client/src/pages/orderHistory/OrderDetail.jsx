import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { GlobalState } from "../../GlobalState";

const OrderDetail = () => {
  const state = useContext(GlobalState);
  const [callback, setCallback] = state.userAPI.callback;
  const [history] = state.userAPI.history;
  const [allHistory, setAllHistory] = useState([]);
  const [orderDetail, setOrderDetail] = useState([]);
  const [btnEdit, setBtnEdit] = useState(false);
  const [total, setTotal] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const [address, setAddress] = useState("");
  const [delivered, setDelivered] = useState("");
  const [status, setStatus] = useState("");
  const [isAdmin, setIsAdmin] = state.userAPI.isAdmin;

  const params = useParams();

  const getAllHistory = async () => {
    const res = await axios.get("/api/payment");
    setAllHistory(res.data);
    setCallback(!callback);
  };

  const onClick = () => {
    setAddress(orderDetail.address);
    setIsEdit(true);
  };

  const update = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin) {
        await axios.put(`/api/payment/${params.id}`, {
          address: address,
          deliveredBy: delivered,
        });
      } else {
        await axios.put(`/api/payment/${params.id}`, {
          status: status,
        });
      }

      setIsEdit(false);
      setAddress("");
      setCallback(!callback);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  getAllHistory();

  useEffect(() => {
    if (isAdmin) {
      allHistory.forEach((item) => {
        if (item._id === params.id) setOrderDetail(item);
      });
    }

    setCallback(!callback);
  }, [allHistory]);

  useEffect(() => {
    if (params.id) {
      history.forEach((item) => {
        if (item._id === params.id) setOrderDetail(item);
      });
    }
  }, [params.id, history]);

  useEffect(() => {
    if (orderDetail.status === "Đang xử lý") {
      setBtnEdit(true);
    }
  }, [orderDetail.status]);

  if (orderDetail.length === 0) return null;

  return (
    <div className="history-page">
      <table className="userInfo">
        <thead>
          <tr>
            <th>Tên người dùng</th>
            <th>Địa chỉ</th>
            <th>Email</th>
            <th>Số điện thoại</th>
            <th>Hình thức giao hàng</th>
            <th>Trạng thái</th>
            <th>Chỉnh sửa</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{orderDetail.name}</td>
            <td>{orderDetail.address}</td>
            <td>{orderDetail.email}</td>
            <td>{orderDetail.phone}</td>
            <td>{orderDetail.deliveredBy}</td>
            <td>{orderDetail.status}</td>
            {btnEdit || isAdmin ? (
              <td>
                <button className="btnEdit" onClick={onClick}>
                  Chỉnh sửa
                </button>
              </td>
            ) : (
              <td>
                <button className="btnEditDisabled" disabled>
                  Chỉnh sửa
                </button>
              </td>
            )}
          </tr>
        </tbody>
      </table>

      <div className="editArea">
        {isEdit ? (
          isAdmin ? (
            <form action="" onSubmit={update} className="editArea">
              <label htmlFor="status">Trạng thái: </label>
              <input
                type="text"
                name="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              />

              <button type="submit">Update</button>
            </form>
          ) : (
            <form action="" onSubmit={update} className="editArea">
              <label htmlFor="address">Địa chỉ: </label>
              <input
                type="text"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />

              <br />

              <label style={{ marginTop: "20px" }} htmlFor="delivered">
                Hình thức giao hàng:{" "}
              </label>
              <input
                style={{ marginTop: "20px" }}
                type="text"
                name="delivered"
                value={delivered}
                onChange={(e) => setDelivered(e.target.value)}
              />

              <button type="submit">Update</button>
            </form>
          )
        ) : null}
      </div>

      <table style={{ margin: "30px auto" }}>
        <thead>
          <tr>
            <th></th>
            <th>Sản phẩm</th>
            <th>Version</th>
            <th>Số lượng</th>
            <th>Tổng cộng</th>
          </tr>
        </thead>
        <tbody>
          {orderDetail.cart.map((item) => (
            <tr key={item.version._id}>
              <td>
                <img src={item.images[0].url} alt="" />
              </td>
              <td>{item.name}</td>
              <td>{item.version.ver}</td>
              <td>{item.quantity}</td>
              <td>
                {(item.version.price * item.quantity)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h4>
        Tổng cộng:{" "}
        {orderDetail.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
      </h4>
    </div>
  );
};

export default OrderDetail;

import React, { useContext, useEffect, useState } from "react";
import { GlobalState } from "../../GlobalState";
import { Link } from "react-router-dom";
import axios from "axios";

const OrderHistory = () => {
  const state = useContext(GlobalState);
  const [history] = state.userAPI.history;
  const [allHistory, setAllHistory] = useState([]);
  const [isAdmin, setIsAdmin] = state.userAPI.isAdmin;

  const getAllHistory = async () => {
    const res = await axios.get("/api/payment");
    setAllHistory(res.data);
  };

  const getTotal = () => {
    let total = 0;
    allHistory.map((item) => {
      total += item.amount;
    });
    return total;
  };

  const getQuantity = () => {
    let quantity = 0;
    allHistory.map((item) => {
      {
        item.cart.map((product) => {
          if (product.name.toLowerCase().includes("lucky box")) {
            quantity += product.quantity;
          }
        });
      }
    });
    return quantity;
  };

  getAllHistory();

  return (
    <div className="history-page">
      {isAdmin ? (
        <div>
          <h2>Lịch sử đặt hàng</h2>

          <h4>Hiện có {allHistory.length} đơn hàng</h4>
          <div>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Ngày khởi tạo</th>
                  <th>Tổng cộng</th>
                  <th>Số lượng</th>
                  <th>Phương thức thanh toán</th>
                  <th>Hình thức giao hàng</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {allHistory.map((item) =>
                  item.deliveredBy.toLowerCase().includes("gdtt") && item.method.includes("chuyển khoản ngân hàng") ? (
                    <tr key={item._id}>
                      <td>{item._id}</td>
                      <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                      <td>
                        {item.amount
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                      </td>
                      {item.cart.map((product) => {
                        if (product.name.toLowerCase().includes("lucky box")) {
                          return <td key={product._id}>{product.quantity}</td>;
                        } else {
                          return null;
                        }
                      })}
                      <td>{item.method}</td>
                      <td>{item.deliveredBy}</td>
                      <td>
                        <Link to={`/history/${item._id}`}>View</Link>
                      </td>
                    </tr>
                  ) : null
                )}
                {allHistory.map((item) =>
                  item.deliveredBy.toLowerCase().includes("gdtt") && item.method.includes("momo") ? (
                    <tr key={item._id}>
                      <td>{item._id}</td>
                      <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                      <td>
                        {item.amount
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                      </td>
                      {item.cart.map((product) => {
                        if (product.name.toLowerCase().includes("lucky box")) {
                          return <td key={product._id}>{product.quantity}</td>;
                        } else {
                          return null;
                        }
                      })}
                      <td>{item.method}</td>
                      <td>{item.deliveredBy}</td>
                      <td>
                        <Link to={`/history/${item._id}`}>View</Link>
                      </td>
                    </tr>
                  ) : null
                )}
                {allHistory.map((item) =>
                  item.deliveredBy.toLowerCase().includes("gdtt") && item.method.includes("cod") ? (
                    <tr key={item._id}>
                      <td>{item._id}</td>
                      <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                      <td>
                        {item.amount
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                      </td>
                      {item.cart.map((product) => {
                        if (product.name.toLowerCase().includes("lucky box")) {
                          return <td key={product._id}>{product.quantity}</td>;
                        } else {
                          return null;
                        }
                      })}
                      <td>{item.method}</td>
                      <td>{item.deliveredBy}</td>
                      <td>
                        <Link to={`/history/${item._id}`}>View</Link>
                      </td>
                    </tr>
                  ) : null
                )}
                {allHistory.map((item) =>
                  item.deliveredBy.toLowerCase().includes("ship") && item.method.includes("chuyển khoản ngân hàng")? (
                    <tr key={item._id}>
                      <td>{item._id}</td>
                      <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                      <td>
                        {item.amount
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                      </td>
                      {item.cart.map((product) => {
                        if (product.name.toLowerCase().includes("lucky box")) {
                          return <td key={product._id}>{product.quantity}</td>;
                        } else {
                          return null;
                        }
                      })}
                      <td>{item.method}</td>
                      <td>{item.deliveredBy}</td>
                      <td>
                        <Link to={`/history/${item._id}`}>View</Link>
                      </td>
                    </tr>
                  ) : null
                )}
                 {allHistory.map((item) =>
                  item.deliveredBy.toLowerCase().includes("ship") && item.method.includes("momo")? (
                    <tr key={item._id}>
                      <td>{item._id}</td>
                      <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                      <td>
                        {item.amount
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                      </td>
                      {item.cart.map((product) => {
                        if (product.name.toLowerCase().includes("lucky box")) {
                          return <td key={product._id}>{product.quantity}</td>;
                        } else {
                          return null;
                        }
                      })}
                      <td>{item.method}</td>
                      <td>{item.deliveredBy}</td>
                      <td>
                        <Link to={`/history/${item._id}`}>View</Link>
                      </td>
                    </tr>
                  ) : null
                )}
                 {allHistory.map((item) =>
                  item.deliveredBy.toLowerCase().includes("ship") && item.method.includes("cod")? (
                    <tr key={item._id}>
                      <td>{item._id}</td>
                      <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                      <td>
                        {item.amount
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                      </td>
                      {item.cart.map((product) => {
                        if (product.name.toLowerCase().includes("lucky box")) {
                          return <td key={product._id}>{product.quantity}</td>;
                        } else {
                          return null;
                        }
                      })}
                      <td>{item.method}</td>
                      <td>{item.deliveredBy}</td>
                      <td>
                        <Link to={`/history/${item._id}`}>View</Link>
                      </td>
                    </tr>
                  ) : null
                )}
              </tbody>
            </table>
          </div>
          <div className="" style={{ margin: "30px auto", fontSize: "20px" }}>
            <h1 style={{ textAlign: "center", color: "red" }}>
              Tổng tất cả đơn hàng
            </h1>
            <table
              style={{
                margin: "30px auto",
                border: "2px solid red",
                borderRadius: "20px",
              }}
            >
              <thead>
                <tr>
                  <th>Tổng số lượng</th>
                  <th>Tổng cộng</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>{getQuantity()}</td>
                  <td>
                    {getTotal()
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div>
          <h2>Lịch sử đặt hàng</h2>

          <h4>Bạn có {history.length} đơn hàng</h4>

          <div>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Ngày khởi tạo</th>
                  <th>Tổng cộng</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {history.map((items) => (
                  <tr key={items._id}>
                    <td>{items._id}</td>
                    <td>{new Date(items.createdAt).toLocaleDateString()}</td>
                    <td>
                      {items.amount
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                    </td>
                    <td>
                      <Link to={`/history/${items._id}`}>View</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;

import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import Clock from "../../components/countDownClock/Clock";

import { GlobalState } from "../../GlobalState";

const methods = [
  {
    title: "momo",
  },
  {
    title: "chuyển khoản ngân hàng",
  },
  {
    title: "cod",
  },
];

const initialState = {
  user_id: "",
  name: "",
  email: "",
  phone: "",
  amount: "",
  address: "",
  cart: [],
  method: "",
};

const initialImage = {
  public_id: "",
  url: "",
};

const Checkout = () => {
  const state = useContext(GlobalState);
  const [callback, setCallback] = state.userAPI.callback;
  const [products] = state.productAPI.products;
  const [cart, setCart] = state.userAPI.cart;
  const navigate = useNavigate();
  const [image, setImage] = useState(initialImage);
  const [listImages, setListImages] = useState([]);
  const [slot, setSlot] = useState(false);

  const [images, setImages] = useState([]);
  const [imagesAfterDelete, setImagesAfterDelete] = useState([]);

  const [id] = state.userAPI.id;

  const [token] = state.token;

  const [payment, setPayment] = useState(initialState);

  const param = useParams();

  const upload = () => {
    try {
      listImages.map(async (imageItem) => {
        if (!imageItem) return alert("File not exist");

        if (imageItem.size > 1024 * 1024) return alert("Size too large!");

        if (imageItem.type !== "image/jpeg" && imageItem.type !== "image/png")
          return alert("File format is incorrect!");

        let formData = new FormData();
        formData.append("file", imageItem);

        const res = await axios.post("/api/upload", formData, {
          headers: {
            "content-type": "multipart/form-data",
            // Authorization: token,
          },
        });
        const newImage = {
          public_id: res.data.public_id,
          url: res.data.url,
        };

        setImage(newImage);
        images.push(newImage);
      });
      setImages(images);
      setListImages([]);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const handleUpload = (e) => {
    e.preventDefault();
    for (let index = 0; index < e.target.files.length; index++) {
      listImages.push(e.target.files[index]);
    }

    setListImages(listImages);
    upload();
  };

  const handleDelete = async (img) => {
    try {
      var i;
      for (let index = 0; index < images.length; index++) {
        if (img.public_id === images[index].public_id) {
          i = index;
        }
      }
      await axios.post(
        "/api/destroy",
        { public_id: img.public_id, url: img.url },
        {
          // headers: { Authorization: token },
        }
      );

      images.splice(i, 1);
      listImages.splice(i, 1);

      for (let index = 0; index < images.length; index++) {
        imagesAfterDelete.push(images[index]);
      }

      setImages(imagesAfterDelete);
      setListImages(listImages);
      setImagesAfterDelete([]);
      setCallback(!callback);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    return setPayment({
      ...payment,
      [name]: value,
      amount: getTotal(),
      cart: cart,
      user_id: id,
    });
  };

  const handleSlot = () => {
    cart.every(async (item, err) => {
      for (let index = 0; index < products.length; index++) {
        if (item.slot !== null && item._id === products[index]._id) {
          await axios.put(
            `/api/products/${item._id}`,
            { ...products[index], slot: products[index].slot - item.quantity},
            {
              headers: { Authorization: token },
            }
          );
        }
      }
    });
    setCallback(!callback)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (images.length === 0 && payment.method !== "cod") {
        return alert("Hãy up bill thanh toán!");
      } else if (
        cart.every((item) => {
          if (item.name.toLowerCase().includes("lucky box")) {
            return item.quantity > 5 && payment.method === "cod";
          }
        })
      ) {
        alert(
          "Bạn vui lòng chọn dưới 5 sản phẩm lucky box khi thanh toán bằng hình thức COD"
        );
      } else if (axios.post("/api/payment", { ...payment, images })) {
        alert("Thanh toán thành công!");

        handleSlot();
        setCart([]);
        addToCart();
        setImages([]);
        setPayment(initialState);
        setCallback(!callback);
        navigate("/history");
      }
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const addToCart = async () => {
    await axios.patch(
      "/user/addcart",
      { cart: [] },
      {
        headers: { Authorization: token },
      }
    );
  };

  const getTotal = () => {
    let total = 0;
    cart.map((item) => {
      total += item.version.price * item.quantity;
    });
    return total;
  };

  return (
    <div>
      {/* <div style={{color: "red"}} className="countdown">
        <h1 style={{margin: "30px 100px"}}>Vui lòng hoàn thành thông tin thanh toán trong 10 phút. Nếu sau 10 phút chúng tôi không nhận được thông tin thanh toán, đơn hàng của bạn sẽ không được xác nhận.</h1>
        <Clock />
      </div> */}
      <div className="info">
        <table>
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
            {cart.map((item) => {
              return (
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
              );
            })}

            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="total">
                <h3>
                  Tổng cộng:{" "}
                  {getTotal()
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                  VND
                </h3>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="paymentInfo">
          <p style={{ margin: "20px 30px" }}>
            CÁC BẠN VUI LÒNG THANH TOÁN THEO CÁC HÌNH THỨC DƯỚI ĐÂY VÀ CHỤP ẢNH
            MÀN HÌNH, SAU ĐÓ UPLOAD BILL ĐỂ SHOP XÁC NHẬN <br />
            - Hàng ord er/deal: 0307199968688 MB bank Nguyen Thao Nguyen <br />
            - Hàng sẵn: 0039100006330004 OCB bank Nguyen Thao Nguyen <br />-
            0942450307 nguyen thao nguyen momo
          </p>
        </div>
      </div>

      <div className="create_product">
        <form action="" onSubmit={handleSubmit}>
          <div className="upload">
            <input
              type="file"
              name="file"
              id="file_up"
              multiple
              onChange={handleUpload}
            />
            <div id="file_img">
              {images.map((image) => {
                return (
                  <div id="imgGroup" key={image.public_id}>
                    <img src={image.url} alt="" />
                    <span onClick={() => handleDelete(image)}>X</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="row">
            <label htmlFor="name">Tên người dùng </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              value={payment.name}
              onChange={handleChangeInput}
            />
          </div>

          <div className="row">
            <label htmlFor="email">Email: </label>
            <input
              type="text"
              name="email"
              id="email"
              required
              value={payment.email}
              onChange={handleChangeInput}
            />
          </div>

          <div className="row">
            <label htmlFor="phone">Số điện thoại: </label>
            <input
              type="text"
              name="phone"
              id="phone"
              required
              value={payment.phone}
              onChange={handleChangeInput}
            />
          </div>

          <div className="row">
            <label htmlFor="address">Địa chỉ </label>
            <textarea
              type="text"
              name="address"
              id="address"
              onChange={handleChangeInput}
              required
              value={payment.address}
              rows="5"
            />
          </div>

          <div className="row">
            <legend>Hình thức thanh toán: </legend>

            <div className="radio-buttons">
              {methods.map((method) => {
                return (
                  <div className="row" key={method.title}>
                    <label htmlFor="">{method.title}</label>
                    <input
                      id={method.title}
                      value={method.title}
                      checked={payment.method === method.title}
                      name="method"
                      type="radio"
                      onChange={handleChangeInput}
                      required
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <button type="submit">Thanh toán</button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;

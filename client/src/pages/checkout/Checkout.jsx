import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  const [total, setTotal] = useState(0);
  const [cart, setCart] = state.userAPI.cart;
  const navigate = useNavigate();
  const [image, setImage] = useState(initialImage);
  const [listImages, setListImages] = useState([]);

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
        { public_id: img.public_id },
        {
          // headers: { Authorization: token },
        }
      );

      images.splice(i, 1);

      for (let index = 0; index < images.length; index++) {
        imagesAfterDelete.push(images[index]);
      }

      setImages(imagesAfterDelete);
      setImagesAfterDelete([]);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    return setPayment({
      ...payment,
      [name]: value,
      amount: total,
      cart: cart,
      user_id: id,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!images) return alert("No images upload");

      if (axios.post("/api/payment", { ...payment, images })) {
        console.log(payment);
        alert("Created a new payment!");

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

  useEffect(() => {
    const getTotal = () => {
      const total = cart.reduce((prev, item) => {
        return prev + item.price * item.quantity;
      }, 0);
      setTotal(total);
    };

    getTotal();
    setCallback(!callback);
  }, [total]);

  return (
    <div>
      <div className="info">
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
              );
            })}

            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td className="total">
                <h3>
                  Tổng cộng:{" "}
                  {total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND
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

        <form action="" onSubmit={handleSubmit}>
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

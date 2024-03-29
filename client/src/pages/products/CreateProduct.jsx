import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { GlobalState } from "../../GlobalState";
import { useParams, useNavigate } from "react-router-dom";

const initialState = {
  product_id: "",
  name: "",
  description: "",
  category: "",
  _id: "",
  slot: "",
};

const initialVer = {
  ver: "",
  price: 0,
  checked: false,
};

const initialImage = {
  public_id: "",
  url: "",
};

const CreateProduct = () => {
  const navigate = useNavigate();
  const state = useContext(GlobalState);
  const [callback, setCallback] = state.userAPI.callback;
  const [product, setProduct] = useState(initialState);
  const [categories] = state.categoryAPI.categories;
  const [image, setImage] = useState(initialImage);
  const [listImages, setListImages] = useState([]);

  const [inputList, setInputList] = useState([initialVer]);

  const [images, setImages] = useState([]);
  const [imagesAfterDelete, setImagesAfterDelete] = useState([]);

  const [products, setProducts] = state.productAPI.products;

  const [onEdit, setOnEdit] = useState(false);

  const [token] = state.token;

  const [isAdmin] = state.userAPI.isAdmin;

  const param = useParams();

  useEffect(() => {
    if (param.id) {
      setOnEdit(true);
      products.forEach((product) => {
        if (product._id === param.id) {
          setProduct(product);
          setImages(product.images);
          setInputList(product.version);
        }
      });
    } else {
      setOnEdit(false);
      setProduct(initialState);
      setImages([]);
    }
  }, [param.id, products]);

  const onClickNew = () => {
    setInputList([...inputList, {
      ver: "",
      price: 0,
      checked: false,
    }]);
  };

  const upload = () => {
    try {
      if (!isAdmin) return alert("You're not an admin");

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
            Authorization: token,
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
      if (!isAdmin) return alert("You're not an admin");

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
          headers: { Authorization: token },
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

  const handleChangeVersion = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    list.checked = false;
    setInputList(list);
  };
  const handleRemoveVersion = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    return setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin) return alert("You are not an Admin");
      if (!images) return alert("No images upload");

      if (onEdit) {
        await axios.put(
          `/api/products/${product._id}`,
          { ...product, version: inputList, images },
          {
            headers: { Authorization: token },
          }
        );

        alert("Updated product!");
      } else {
        await axios.post(
          "/api/products",
          { ...product, version: inputList, images },
          {
            headers: { Authorization: token },
          }
        );

        alert("Created a new product!");
      }

      setImages([]);
      setInputList(initialVer);
      setProduct(initialState);
      setProducts([...products]);
      setCallback(!callback);
      navigate("/products");
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
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
          <label htmlFor="product_id">ID: </label>
          <input
            type="text"
            name="product_id"
            id="product_id"
            required
            value={product.product_id}
            onChange={handleChangeInput}
          />
        </div>

        <div className="row">
          <label htmlFor="name">Tên sản phẩm: </label>
          <input
            type="text"
            name="name"
            id="name"
            required
            value={product.name}
            onChange={handleChangeInput}
          />
        </div>

        <div className="row">
          <label htmlFor="description">Miêu tả: </label>
          <textarea
            type="text"
            name="description"
            id="description"
            onChange={handleChangeInput}
            required
            value={product.description}
            rows="5"
          />
        </div>

        <div className="row">
          <label htmlFor="product_cate">Phân loại: </label>
          <select
            name="category"
            value={product.category}
            onChange={handleChangeInput}
          >
            <option value="">Chọn loại mặt hàng</option>
            {categories.map((category) => {
              return (
                <option value={category._id} key={category._id}>
                  {category.name}
                </option>
              );
            })}
          </select>
        </div>

        <div className="row">
          <label htmlFor="slot">Số lượng sản phẩm: </label>
          <input
            type="number"
            name="slot"
            id="slot"
            value={product.slot}
            onChange={handleChangeInput}
          />
        </div>

        {inputList.map((x, i) => {
          return (
            <div className="row" key={i}>
              <div className="">
                <label htmlFor="verison">Version: </label>
                <input
                  type="text"
                  value={x.ver}
                  name="ver"
                  id="ver"
                  onChange={(e) => handleChangeVersion(e, i)}
                />
              </div>

              <div className="">
                <label htmlFor="price">Giá sản phẩm: </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  required
                  value={x.price}
                  onChange={(e) => handleChangeVersion(e, i)}
                />
              </div>

              <div className="btn-box">
                {inputList.length !== 1 && (
                  <button className="mr10" onClick={() => handleRemoveVersion(i)}>
                    Remove
                  </button>
                )}
                {inputList.length - 1 === i && (
                  <button onClick={onClickNew}>Add</button>
                )}
              </div>
            </div>
          );
        })}

        <button type="submit">
          {onEdit ? "Cập nhật thông tin" : "Thêm sản phẩm"}
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;

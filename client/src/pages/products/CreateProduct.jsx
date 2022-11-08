import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { GlobalState } from "../../GlobalState";
import { useParams, useNavigate } from "react-router-dom";

const initialState = {
  product_id: "",
  name: "",
  price: 0,
  description: "",
  category: "",
  version: "",
  _id: "",
};

const initialImage = {
  public_id: "",
  url: "",
};

const CreateProduct = () => {
  const navigate = useNavigate();
  const state = useContext(GlobalState);
  const [callback, setCallback] = state.userAPI.callback
  const [product, setProduct] = useState(initialState);
  const [categories] = state.categoryAPI.categories;
  const [image, setImage] = useState(initialImage);
  const [listImages, setListImages] = useState([]);

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
        }
      });
    } else {
      setOnEdit(false);
      setProduct(initialState);
      setImages([]);
    }
  }, [param.id, products]);

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
        { public_id: img.public_id },
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
          { ...product, images },
          {
            headers: { Authorization: token },
          }
        );

        alert("Updated product!");
      } else {
        await axios.post(
          "/api/products",
          { ...product, images },
          {
            headers: { Authorization: token },
          }
        );

        alert("Created a new product!");
      }

      setImages([]);
      setProduct(initialState);
      setProducts([...products]);
      setCallback(!callback)
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
          <label htmlFor="price">Giá sản phẩm: </label>
          <input
            type="number"
            name="price"
            id="price"
            required
            value={product.price}
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
          <label htmlFor="verison">Version: </label>
          <input type="text" value={product.version} name="version" id="version" onChange={handleChangeInput}/>
        </div>

        <button type="submit">
          {onEdit ? "Cập nhật thông tin" : "Thêm sản phẩm"}
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;

import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import ProductItem from "../../components/productItem/ProductItem";
import { GlobalState } from "../../GlobalState";
import ImageSlider from "../../utils/ImageSlider/ImageSlider";

const ProductDetail = () => {
  const params = useParams();
  const state = useContext(GlobalState);
  const [products] = state.productAPI.products;
  const [detailProduct, setDetailProduct] = useState([]);
  const [imagesList, setImagesList] = useState([]);
  const [price, setPrice] = useState(0)
  const [selectedVersion, setSelectedVersion] = useState("")
  const [version, setVersion] = useState([])

  const addCart = state.userAPI.addCart;

  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;

  const navigate = useNavigate();

  const handleSelect = e => {
    detailProduct.version.map(item => {
      if (item.ver === e.target.value) {
        setPrice(item.price)
        setVersion(item)
      }
    })
    setSelectedVersion(e.target.value);
  }

  const deleteProduct = async () => {
    for (let index = 0; index < detailProduct.images.length; index++) {
      imagesList.push(detailProduct.images[index]);
    }

    setImagesList(imagesList);
    try {
      if (window.confirm("Bạn muốn xóa sản phẩm?")) {
        imagesList.map(async (image) => {
          const destroyImg = axios.post(
            "/api/destroy",
            { public_id: image.public_id },
            {
              headers: { Authorization: token },
            }
          );
          await destroyImg;
        });

        const destroyProduct = axios.delete(
          `/api/products/${detailProduct._id}`,
          {
            headers: { Authorization: token },
          }
        );
        await destroyProduct;

        navigate("/products");
      }
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  useEffect(() => {
    if (params.id) {
      products.forEach((product) => {
        if (product._id === params.id) setDetailProduct(product);
      });
    }

  }, [params.id, products]);

  if (detailProduct.length === 0) return null;

  const images = detailProduct.images;

  return (
    <>
      <div className="detail">
        <div className="slider">
          <ImageSlider slides={images} />
        </div>
        <div className="box-detail">
          <div className="row">
            <h2>{detailProduct.name}</h2>
            {detailProduct.version.length !== 0 ? (
              <div>
                <h5>Version: </h5>
                <select value={selectedVersion} onChange={handleSelect}>
                  <option value="default">Chọn version</option>
                  {detailProduct.version.map((item) => {
                    return (
                      <option value={item.ver} key={item.ver}>
                        {item.ver}
                      </option>
                    );
                  })}
                </select>
              </div>
            ) : detailProduct.version[0].ver !== "default" ? (
              <h5>Version: {detailProduct.version[0].ver}</h5>
            ) : null}
          </div>
          <div className="row">
            <span>
              Giá: {selectedVersion !== "" && selectedVersion !== "default" ? price
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ".") : `${detailProduct.version[0].price.toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ".")} - ${detailProduct.version[detailProduct.version.length - 1].price.toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}` } VND
            </span>
            {isAdmin ? (
              <div>
                <Link to="/products" className="delete" onClick={deleteProduct}>
                  Xóa sản phẩm
                </Link>
                <Link
                  to={`/edit_product/${detailProduct._id}`}
                  className="edit"
                >
                  Sửa sản phẩm
                </Link>
              </div>
            ) : (
              <Link
                to="#!"
                className="cart"
                onClick={() => addCart(detailProduct, version)}
              >
                Thêm vào giỏ
              </Link>
            )}
          </div>

          <span>Miêu tả: </span>
          <p id="description" style={{ whiteSpace: "pre-line" }}>
            {detailProduct.description}
          </p>
        </div>
      </div>

      <div className="related-products">
        <h2 className="title">Sản phẩm liên quan</h2>
        <div className="products">
          {products.map((product) => {
            return product._id !== detailProduct._id &&
              product.category === detailProduct.category ? (
              <ProductItem key={product._id} product={product} />
            ) : null;
          })}
        </div>
      </div>
    </>
  );
};

export default ProductDetail;

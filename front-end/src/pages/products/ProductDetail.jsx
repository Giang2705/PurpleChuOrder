import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ProductItem from "../../components/productItem/ProductItem";
import { GlobalState } from "../../GlobalState";
import ImageSlider from "../../utils/ImageSlider/ImageSlider";

const ProductDetail = () => {
  const params = useParams();
  const state = useContext(GlobalState);
  const [products] = state.productAPI.products;
  const [detailProduct, setDetailProduct] = useState([]);
  const [imagesList, setImagesList] = useState([])

  const addCart = state.userAPI.addCart

  const [isAdmin] = state.userAPI.isAdmin
  const [token] = state.token
  
  const deleteProduct = async () => {
    for (let index = 0; index < detailProduct.images.length; index++) {
      imagesList.push(detailProduct.images[index])
    }

    setImagesList(imagesList)
    try {
      imagesList.map(async image => {
        const destroyImg = axios.post('/api/destroy', {public_id: image.public_id}, {
          headers: {Authorization: token}
        })
        await destroyImg
      })
      
      const destroyProduct = axios.delete(`/api/products/${detailProduct._id}`, {
        headers: {Authorization: token}
      })
      await destroyProduct

    } catch (err) {
      alert(err.response.data.msg)
    }
  }

  useEffect(() => {
    if (params.id) {
      products.forEach((product) => {
        if (product._id === params.id) setDetailProduct(product);
      });
    }
  }, [params.id, products]);

  if (detailProduct.length === 0) return null;

  const images = detailProduct.images

  return (
    <>
      <div className="detail">
        <div className="slider">
          <ImageSlider slides={images} />
        </div>
        <div className="box-detail">
          <div className="row">
            <h2>{detailProduct.name}</h2>
            <h5>ID: {detailProduct.product_id}</h5>
          </div>
          <span>Giá: {detailProduct.price
          } VND</span>
          <p><span>Miêu tả: </span> {detailProduct.description}</p>
          <p className="sold">Sold: {detailProduct.sold}</p>
          {
            isAdmin ? <div>
              <Link to="/products" className="delete" onClick={deleteProduct}>
            Xóa sản phẩm
          </Link>
          <Link to={`/edit_product/${detailProduct._id}`} className="edit">
            Sửa sản phẩm
          </Link>
            </div> : 
          <Link to="#!" className="cart" onClick={() => addCart(detailProduct)}>
            Thêm vào giỏ
          </Link>
          }
        </div>
      </div>

      <div className="related-products">
        <h2 className="title">Sản phẩm liên quan</h2>
        <div className="products">
          {products.map((product) => {
            return product._id !== detailProduct._id && product.category === detailProduct.category ? (
              <ProductItem key={product._id} product={product} />
            ) : null;
          })}
        </div>
      </div>
    </>
  );
};

export default ProductDetail;

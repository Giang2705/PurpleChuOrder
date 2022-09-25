import React, { useContext, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ProductItem from "../../components/productItem/ProductItem";
import { GlobalState } from "../../GlobalState";

const ProductDetail = () => {
  const params = useParams();
  const state = useContext(GlobalState);
  const [products] = state.productAPI.products;
  const [detailProduct, setDetailProduct] = useState([]);
  // const [images] = detailProduct.images

  useEffect(() => {
    if (params.id) {
      products.forEach((product) => {
        if (product._id === params.id) setDetailProduct(product);
      });
    }
  }, [params.id, products]);

  if (detailProduct.length === 0) return null;

  return (
    <>
      <div className="detail">
        {
            detailProduct.images.map(image => {
                return <img src={image.url} alt="" key={image.public_id} />
            })
        }
        <div className="box-detail">
          <div className="row">
            <h2>{detailProduct.name}</h2>
            <h5>ID: {detailProduct.product_id}</h5>
          </div>
          <span>${detailProduct.price}</span>
          <p>{detailProduct.description}</p>
          <p className="sold">Sold: {detailProduct.sold}</p>
          <Link to="/cart" className="cart">
            Thêm vào giỏ
          </Link>
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

import React from "react";
import { Link } from "react-router-dom";
import BtnRender from "./BtnRender";

const ProductItem = ({ product }) => {
  return (
    <div className="product_card">
      <img src={product.images[0].url} alt="" />

      <div className="product_box">
        <h2>{product.name}</h2>
        <div className="row">
          <span>
            {product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND
          </span>

          <BtnRender product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductItem;

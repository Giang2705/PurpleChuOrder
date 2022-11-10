import React from "react";
import { Link } from "react-router-dom";
import BtnRender from "./BtnRender";

const ProductItem = ({ product }) => {
  return (
    <div className="product_card">
      <img src={product.images[0].url} alt="" />

      <div className="product_box">
        <h2>{product.name}</h2>
        {
          <h5>
            Version:{" "}
            {product.version.length > 1 && product.version[0].ver !== ""
              ? product.version.map((item) => {
                  return item.ver + ", ";
                })
              : product.version[0].ver}{" "}
          </h5>
        }
        <div className="row">
          <span>
            {product.version.length > 1 && product.version[0].ver !== ""
              ? product.version[0].price
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ".") +
                " - " +
                product.version[product.version.length-1].price
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
              : product.version[0].price
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
            VND
          </span>

          <BtnRender product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductItem;

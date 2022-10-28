import React, { useContext, useEffect, useState } from "react";
import ProductItem from "../../components/productItem/ProductItem";
import { GlobalState } from "../../GlobalState";
import axios from "axios";
import Filters from "./Filters";

const ProductsListPage = () => {
  const state = useContext(GlobalState);
  const [products, setProducts] = state.productAPI.products;

  return (
    <>
      <Filters />
      <div className="products">
        {products.map((product) => {
          return <ProductItem key={product._id} product={product} />;
        })}
      </div>
    </>
  );
};

export default ProductsListPage;

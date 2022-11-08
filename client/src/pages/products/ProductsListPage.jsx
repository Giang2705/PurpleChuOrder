import React, { useContext, useEffect, useState } from "react";
import ProductItem from "../../components/productItem/ProductItem";
import { GlobalState } from "../../GlobalState";
import axios from "axios";
import Filters from "./Filters";
import LoadMore from "./LoadMore";
import Loading from "../../utils/Loading/Loading";

const ProductsListPage = () => {
  const state = useContext(GlobalState);
  const [products, setProducts] = state.productAPI.products;
  const [callback, setCallback] = state.productAPI.callback;

  useEffect(() => {
    setCallback(!callback)
  }, [])

  return (
    <>
      <Filters />
      <div className="products">
        {products.map((product) => {
          return <ProductItem key={product._id} product={product} />;
        })}
      </div>
      <LoadMore />
      {products.length === 0 && <Loading />}
        
    </>
  );
};

export default ProductsListPage;

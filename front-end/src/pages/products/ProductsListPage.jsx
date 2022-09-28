import React, { useContext, useEffect } from "react";
import ProductItem from "../../components/productItem/ProductItem";
import { GlobalState } from "../../GlobalState";

import axios from "axios";

const ProductsListPage = () => {
  const state = useContext(GlobalState);
  const [products, setProducts] = state.productAPI.products;

  const getProducts = async () => {
    const res = await axios.get("/api/products");
    setProducts(res.data.products);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="products">
      {products.map((product) => {
        return <ProductItem key={product._id} product={product} />;
      })}
    </div>
  );
};

export default ProductsListPage;

import React, { useState } from "react";
import { useContext } from "react";
import { GlobalState } from "../../GlobalState";
import Carousel from "react-elastic-carousel";
import { Link } from "react-router-dom";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 768, itemsToShow: 2 },
  { width: 1200, itemsToShow: 3 },
];

const ProductsCarousel = () => {
  const state = useContext(GlobalState);
  const [products] = state.productAPI.products;
  const [displayedProducts] = useState([]);
  const [callback, setCallback] = state.productAPI.callback
  let count = 0;

  products.map(items => {
    if (count <= 8) {
      displayedProducts.push(items);
      count += 1;
    }
  });

  return (
    <div className="products-carousel">
      <div className="title">
        <h1 style={{ textAlign: "center" }}>Sản phẩm</h1>
        <Link to={"/products"}>Xem thêm</Link>
      </div>
      
      <hr />
      <div className="carousel">
        <Carousel breakPoints={breakPoints}>
          {displayedProducts.map((items, index) => {
            return (
              <Link key={index} to={`/detail/${items._id}`}>
                <img src={items.images[0].url} alt="" />
              </Link>
            );
          })}
        </Carousel>
      </div>
    </div>
  );
};

export default ProductsCarousel;

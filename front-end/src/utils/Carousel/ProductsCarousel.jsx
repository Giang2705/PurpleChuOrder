import React, { useState } from "react";
import { useContext } from "react";
import { GlobalState } from "../../GlobalState"
import Carousel from "react-elastic-carousel";
import { Link } from 'react-router-dom'

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 768, itemsToShow: 2 },
  { width: 1200, itemsToShow: 3 },
];

const ProductsCarousel = () => {
    const state = useContext(GlobalState)
    const [products] = state.productAPI.products
    const [displayedProducts] = useState([])
    let count = 0

    products.map((items, key) => {
        if (count <= 8) {
            displayedProducts.push(items)
            count+=1
        }
    })

  return (
    <div className="products-carousel">
    <hr />
      <div className="title">
        <h1 style={{ textAlign: "center" }}>
            Sản phẩm
        </h1>
        <Link to={"/products"}>Xem thêm</Link>
      </div>
      <div className="carousel">
        <Carousel breakPoints={breakPoints}>
          {
            displayedProducts.map(items => {
                return <img key={items.images[0].public_id} src={items.images[0].url} alt="" />
            })
          }
        </Carousel>
      </div>
    </div>
  );
};

export default ProductsCarousel;

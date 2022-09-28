import React, {useState, useEffect} from 'react'
import axios from "axios"

const ProductAPI = () => {
    const [products, setProducts] = useState([])

  return {
    products: [products, setProducts]
  }
}

export default ProductAPI
import React, {useState, useEffect} from 'react'
import axios from "axios"

const ProductAPI = () => {
    const [products, setProducts] = useState([])
    const [callback, setCallback] = useState(false) 

  
    useEffect(() => {
      const getProducts = async () => {
        const res = await axios.get('/api/products')
        setProducts(res.data.products)
      }
      getProducts()
    },[])
  return {
    products: [products, setProducts],
    callback: [callback, setCallback]
  }
}

export default ProductAPI
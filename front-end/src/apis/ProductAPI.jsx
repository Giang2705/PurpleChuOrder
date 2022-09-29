import React, {useState, useEffect} from 'react'
import axios from "axios"

const ProductAPI = () => {
    const [products, setProducts] = useState([])
  
    useEffect(() => {
      const getProducts = async () => {
        const res = await axios.get('/api/products')
        setProducts(res.data.products)
      }
      getProducts()
    },[])
    
  return {
    products: [products, setProducts],
  }
}

export default ProductAPI
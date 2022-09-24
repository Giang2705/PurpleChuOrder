import React, {useContext} from 'react'
import ProductItem from '../../components/productItem/ProductItem'
import { GlobalState } from '../../GlobalState'

const ProductsListPage = () => {
  const state = useContext(GlobalState)
  const [products] = state.productAPI.products

  return (
    <div className='products'>
      {
        products.map(product => {
          return <ProductItem key={product._id} product={product}/>
        })
      }
    </div>
  )
}

export default ProductsListPage
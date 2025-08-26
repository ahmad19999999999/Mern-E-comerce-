import React, { useState } from 'react'
import '../Style/componentStyles/Product.css'
import { Link } from 'react-router-dom'
import Rating from './Rating'

const Product = ({product}) => {
    const [rating,setrating]=useState(0)
    const handelRetingChange=(newrating)=>{
        setrating(rating)
        console.log(`rating change to :${newrating}`)
    }
  return (
    <Link to={`/product/${product._id}`} className='product_id'>
    <div className="product-card">
        <img src={product.images[0].url} alt={product.name} className='product-image-card'/>

        <div className="product-details">
            <h3 className="product-title">
                {product.name}
            </h3>
            <p className="home-price">
                <strong>price</strong>{product.price}/-
            </p>
            <div className="rating_container">
                <Rating value={product.rating} onRatingChang={handelRetingChange}
                disabled={true}
                />
            </div>
            <span className="productCardSpan">
            ( {product.numOfReviews} {product.numOfReviews===1 ?'Review':'Reviews'})
            </span>
            <button className="add-to-cart">
                view Details

            </button>

        </div>
    </div>
</Link>
  )
}

export default Product
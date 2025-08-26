import React from 'react'
import '../Style/componentStyles/NoProducts.css'

const Noproduct = (keyword) => {
  return (
    <div className='no-products-content '>
        <div className='no-products-icon'>⚠️
        </div>
        <h3 className='no-products-title'>No Product Found</h3>
    <p className="no-products-message">
  {keyword
    ? `We couldn't find any products matching "${keyword}". Try using different keywords or browse our complete catalog.`
    : 'No products found. Try browsing our catalog.'}
</p>


    </div>
  )
}

export default Noproduct
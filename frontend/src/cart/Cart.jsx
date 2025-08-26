import React from 'react'
import '../Style/CartStyles/Cart.css'
import PageTitle from '../components/PageTitle'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CartItem from './CartItem'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

const Cart = (item) => {
  const { cartItem } = useSelector((state) => state.cart);

  // حساب القيم
  const subtotal = cartItem.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.18; // 18% ضريبة
  const shipping = subtotal > 0 ? 50 : 0; // إذا فيه منتجات أضف شحن
  const total = subtotal + tax + shipping;
  const navigate=useNavigate()
  const chekoutHandler=()=>{
    navigate('/login?redirect=/shipping')

  }

  return (
    <>
      {cartItem.length === 0 ? (
        <>
          <PageTitle title="your cart" />
          <Navbar />
          <div className="empty-cart-container ">
            <p className="empty-cart-message">Your Cart is empty</p>
            <Link to="/products" className="viewProducts">
              View Products
            </Link>
          </div>
          <Footer />
        </>
      ) : (
        <>
          <PageTitle title="your cart" />
          <Navbar />
          <div className="cart-page">
            <div className="cart-items">
              <div className="cart-items-heading">Your Cart</div>
              <div className="cart-table">
                <div className="cart-table-header">
                  <div className="header-product">Product</div>
                  <div className="header-quantity">Quantity</div>
                  <div className="header-total item-total-heading">Item Total</div>
                  <div className="header-action item-total-heading">Actions</div>
                </div>

                {cartItem.map((item) => (
                  <CartItem key={item.product} item={item} />
                ))}
              </div>
            </div>

            <div className="price-summary">
              <h3 className="price-summary-heading">Price Summary</h3>
              <div className="summary-item">
                <p className="summary-label">Subtotal:</p>
                <p className="summary-value">{subtotal.toFixed(2)}/-</p>
              </div>

              <div className="summary-item">
                <p className="summary-label">Tax (18%):</p>
                <p className="summary-value">{tax.toFixed(2)}/-</p>
              </div>

              <div className="summary-item">
                <p className="summary-label">Shipping:</p>
                <p className="summary-value">{shipping.toFixed(2)}/-</p>
              </div>

              <div className="summary-total">
                <p className="total-label">Total:</p>
                <p className="total-value">{total.toFixed(2)}/-</p>
              </div>
              <button className="checkout-btn" onClick={chekoutHandler}>Process To Checkout</button>
            </div>
          </div>

          <Footer />
        </>
      )}
    </>
  );
};
export default Cart;
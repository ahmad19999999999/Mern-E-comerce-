import React from 'react'
import '../Style/CartStyles/OrderConfirm.css'
import PageTitle from '../components/PageTitle'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useSelector } from 'react-redux'
import CheckoutPath from './CheckoutPath'
import { useNavigate } from 'react-router-dom'
const Orderconfirm = () => {
     const { shippinginfo,cartItem} = useSelector((state) => state.cart);
      const { user} = useSelector((state) => state.user); 

      const subtotal = cartItem.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.18; // 18% ضريبة
  const shipping = subtotal > 0 ? 50 : 0; // إذا فيه منتجات أضف شحن
  const total = subtotal + tax + shipping;

  const navigate=useNavigate()

  const ProccesToPayment=()=>{
    const data={
        subtotal,
        tax,
        shipping,
        total
    }
    sessionStorage.setItem('orderItem',JSON.stringify(data))
    navigate('/proccess/payment')
  }
  return (
    <>
    <PageTitle title='order confirm' />
    <Navbar/>
    <CheckoutPath activepath={1}/>
    <div className='confirm-container'>
        <h1 className='confirm-header '>Order Confirmation</h1>
        <div className='confirm-table-container '>
            <table className='confirm-table'>
                <caption>Shipping Details</caption>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Adress</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>{user.name}</td>
                        <td>{shippinginfo.phoneNumber}</td>
                        <td>{shippinginfo.address},{shippinginfo.city},{shippinginfo.state},{shippinginfo.country}-{shippinginfo.pinCode}</td>
                        </tr> 
                </tbody>
            </table>

            <table className='confirm-table cart-table' >
                <caption>Cart Items</caption>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Totale Price</th>
                    </tr> 
                </thead>

                <tbody>
                   {cartItem.map(item=>  
                   <tr key={item.product}>
                        <td><img src={item.image} alt={item.name} className='product-image' /></td>
                        <td>{item.name}</td>
                        <td>{item.price}</td>
                        <td>{item.quantity}</td>
                        <td>{item.quantity*item.price}</td>
                    </tr> )}
                </tbody>
            </table>

            <table className='confirm-table'>
                <caption>Order Summary</caption>

                <thead>
                      <tr>
                        <th>Subtotale</th>
                        <th>Shipping Charges</th>
                        <th>Gts</th>
                        <th>Totale</th>
                    </tr> 
                </thead>

                <tbody>
                    <tr>
                        <td>{subtotal}</td>
                        <td>{shipping}</td>
                        <td>{tax}</td>
                        <td>{total}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <button className='proceed-button' onClick={ProccesToPayment}>Proccess to Payment</button>
    </div>



    <Footer/>
    
    </>
  )
}

export default Orderconfirm
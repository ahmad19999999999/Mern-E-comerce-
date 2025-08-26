import React, { useEffect } from 'react'
import '../Style/OrderStyles/OrderDetails.css'
import PageTitle from '../components/PageTitle'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderDetails, removeError } from '../features/order/OrderSlice'
import { toast } from 'react-toastify'

const OrderDetails = () => {
    const {orderId} = useParams()
     const { order, loading, error } = useSelector((state) => state.order);
       const dispatch = useDispatch();

useEffect(() => {
  if (orderId) {
    dispatch(getOrderDetails(orderId));
  }

  if (error && !toast.isActive('error-toast')) {
    toast.error(error, {
      toastId: 'error-toast',
      position: 'top-center',
      autoClose: 3000,
    });
    dispatch(removeError());
  }
}, [dispatch, orderId, error]);

const {shippingInfo={}, orderItem=[], totaleprice
, paymentInfo={},orderStatus,
taxprice,shippingprice,Itemprice,paidAt
} = order
const paymentStatus = paymentInfo.status==='success'? 'Paid':'Not Paid'
const finalorderstatus=paymentStatus==='Not Paid' ? 'cancelled':orderStatus
const orderstatusclass =
  finalorderstatus === 'delivered'
    ? 'status-tag delivered'
    : `status-tag ${finalorderstatus.toLowerCase()}`;
    const paymentclass=`pay-tag ${paymentStatus==='Paid'?'paid':'not-paid'}`



  

  return (
   <>
   <PageTitle title={orderId}/>
   <Navbar/>
   <div className='order-box'>
    <div className='table-block'>
        <h2 className='table-title'>
            Order Item
        </h2>
        <table className='table-main '>
            <thead>
                <tr className='table-head'>
                    <th className="head-cell">Image</th>
                    <th className="head-cell">Name</th>
                    <th className="head-cell">Quantity</th>
                    <th className="head-cell">Price</th>
                </tr>
            </thead>

            <tbody>
               {orderItem.map((item,index)=>(
                <tr className='table-row' key={index}>
                    <td className='table-cell'><img src={item.image} alt={item.name} className='item-img' /></td>
                    <td className='table-cell'>{item.name}</td>
                    <td className='table-cell'>{item.quantity}</td>
                    <td className='table-cell'>{item.price}</td>
                </tr>))
             }
            </tbody>
        </table>
    </div>

      <div className='table-block'>
        <h2 className='table-title'>
            Shipping Info
        </h2>
        <table className='table-main '>
            <tbody>
                     <tr className='table-row'>
                    <th className="table-cell">Adress</th>
                    <td className="head-cell">{shippingInfo.address},{shippingInfo.city},{shippingInfo.postalCode},{shippingInfo.country}</td>
                    </tr>

                    <tr className='table-row'>
                    <th className="table-cell">Phone</th>
                    <td className="head-cell">{shippingInfo.phone}</td>
                    </tr>
            </tbody>
           
        </table>
    </div>

     <div className='table-block'>
        <h2 className='table-title'>
            Order Summary
        </h2>
        <table className='table-main '>

            <tbody>
                  <tr className='table-row'>
                    <th className="table-cell">Order Status</th>
                    <td className="table-cell"><span className={orderstatusclass}>{finalorderstatus}</span></td>
                  </tr>

                   <tr className='table-row'>
                    <th className="table-cell">Payment</th>
                    <td className="table-cell"> <span className={paymentclass}>{paymentStatus}</span> </td> 
                   </tr>

                 {paidAt &&  (<tr className='table-row'>
                    <th className="table-cell">Paid AT</th>
                    <td className="table-cell">{new Date(paidAt).toLocaleString()}</td>
                   </tr>)}

                     <tr className='table-row'>
                    <th className="table-cell">Item Price</th>
                    <td className="table-cell">{Itemprice}</td>
                    </tr>

                    
                     <tr className='table-row'>
                    <th className="table-cell">Tax Price</th>
                    <td className="table-cell">{taxprice}</td>
                    </tr>

                    
                     <tr className='table-row'>
                    <th className="table-cell">Shipping Price</th>
                    <td className="table-cell">{shippingprice}</td>
                    </tr>

                      <tr className='table-row'>
                    <th className="table-cell">Total Price</th>
                    <td className="table-cell">{totaleprice}</td>
                    </tr>

                 
            </tbody>
        </table>
    </div>
   </div>



   <Footer/>
   </>
  )}

export default OrderDetails
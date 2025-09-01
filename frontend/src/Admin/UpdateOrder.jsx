import React, { useState, useEffect } from 'react'
import '../Style/AdminStyles/UpdateOrder.css'
import Navbar from '../components/Navbar'
import PageTitle from '../components/PageTitle'
import Footer from '../components/Footer'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderDetails } from '../features/order/OrderSlice'
import { removeAccess, removeError, Updateorder } from '../features/admin/AdminSlice'
import { toast } from 'react-toastify'

const UpdateOrder = () => {
  const { orderId } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { order, loading: ordersLoading } = useSelector((state) => state.order)
  const { success, error, loading: adminLoading } = useSelector((state) => state.admin)
  const loading = adminLoading || ordersLoading

  // State for selected order status
  const [status, setStatus] = useState('')
  
  // Local state to track if user attempted an update
  const [updateAttempted, setUpdateAttempted] = useState(false)//for toast replay and deleted after showing

  const {
    shippingInfo = {},
    orderItem = [],
    totalPrice,
    paymentInfo = {},
    orderStatus,
  } = order

  const paymentStatus = paymentInfo.status === 'success' ? 'Paid' : 'Not Paid'
  const finalOrderStatus = paymentStatus === 'Not Paid' ? 'Cancelled' : orderStatus

  // -----------------------------
  // Clear old success/error on mount
  // -----------------------------
  useEffect(() => {
    dispatch(removeAccess())
    dispatch(removeError())
  }, [dispatch])

  // -----------------------------
  // Fetch order details from backend
  // -----------------------------
  useEffect(() => {
    dispatch(getOrderDetails(orderId))
  }, [dispatch, orderId])

  // -----------------------------
  // Sync local status with fetched order
  // -----------------------------
  useEffect(() => {
    if (order?.orderStatus) {
      setStatus(order.orderStatus)
    }
  }, [order])

  // -----------------------------
  // Handle status update
  // -----------------------------
  const handleUpdateStatus = (e) => {
    e.preventDefault()
    setUpdateAttempted(true) // mark that user clicked update
    dispatch(Updateorder({ orderId, orderStatus: status }))
  }

  // -----------------------------
  // Show success toast only if user attempted update
  // -----------------------------
  useEffect(() => {
    if (success && updateAttempted) {
      toast.success("Order status updated successfully!", {
        position: "top-center",
        autoClose: 3000,
        toastId: "updatesuccess"
      })
      dispatch(removeAccess())
      setUpdateAttempted(false) // reset after showing toast
    }
  }, [success, dispatch, updateAttempted])

  // -----------------------------
  // Show error toast only if user attempted update
  // -----------------------------
  useEffect(() => {
    if (error && updateAttempted) {
      toast.error(error || "Failed to update order status", {
        position: "top-center",
        autoClose: 3000,
        toastId: "updateerror"
      })
      dispatch(removeError())
      setUpdateAttempted(false) // reset after showing toast
    }
  }, [error, dispatch, updateAttempted])

  return (
    <>
      <Navbar />
      <PageTitle title='Update Order' />
      <div className="order-container">
        <h1 className="order-title">Order Details</h1>

        {/* Order Information */}
        <div className="order-details">
          <h2>Order Information</h2>
          <p><strong>Order Id: </strong>{order._id}</p>
          <p><strong>Shipping Address: </strong>{shippingInfo.address}, {shippingInfo.city}, {shippingInfo.postalCode}, {shippingInfo.country}</p>
          <p><strong>Phone: </strong>{shippingInfo.phone}</p>
          <p><strong>Order Status: </strong>{finalOrderStatus}</p>
          <p><strong>Payment Status: </strong>{paymentStatus}</p>
          <p><strong>Total Price: </strong>{totalPrice}</p>
        </div>

        {/* Order Items */}
        <div className="order-items">
          <h2>Order Items</h2>
          <table className="order-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {orderItem && orderItem.map((item, index) =>
                <tr key={index}>
                  <td><img src={item?.image} alt={item.name} className="order-item-image" /></td>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Update Order Status */}
        <div className="order-status" de>
          <h2>Order Status</h2>
          <select
            className="status-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            disabled={loading|| orderStatus==='delivered'} // prevent changes while loading
          >
            <option value="Not Processed">Not Processed</option>
            <option value="Processing">processing</option>
            <option value="shipping">shipping</option>
            <option value="delivered">delivered</option>
            <option value="cancelled">cancelled</option>
          </select>
          <button
            className="update-button"
            onClick={handleUpdateStatus}
            disabled={loading ||!orderStatus || orderStatus==='delivered'} // prevent multiple clicks while loading
          >
            Update Status
          </button>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default UpdateOrder

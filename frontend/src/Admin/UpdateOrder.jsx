import React from 'react'
import '../Style/AdminStyles/UpdateOrder.css'
import Navbar from '../components/Navbar'
import PageTitle from '../components/PageTitle'
import Footer from '../components/Footer'

const UpdateOrder = () => {
  return (
    <>
    <Navbar />
    <PageTitle title='Update Order'/>
    <div className="order-container">
      <h1 className="order-title">Order Details</h1>

      {/* Customer Info */}
      <div className="order-details">
        <h2>Customer Information</h2>
        <p>Name: Ahmed Mohamed</p>
        <p>Email: ahmed@example.com</p>
        <p>Address: Riyadh - Saudi Arabia</p>
      </div>

      {/* Items */}
      <div className="order-items">
        <h2>Items</h2>
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
            <tr>
              <td>
                <img
                  src="https://via.placeholder.com/50"
                  alt="item"
                  className="order-item-image"
                />
              </td>
              <td>Smart Watch</td>
              <td>1</td>
              <td>300 SAR</td>
            </tr>
            <tr>
              <td>
                <img
                  src="https://via.placeholder.com/50"
                  alt="item"
                  className="order-item-image"
                />
              </td>
              <td>Bluetooth Headphones</td>
              <td>2</td>
              <td>200 SAR</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Status */}
      <div className="order-status">
        <h2>Order Status</h2>
        <select className="status-select">
          <option>Pending</option>
          <option>Processing</option>
          <option>Shipped</option>
          <option>Delivered</option>
        </select>
        <button className="update-button">Update Status</button>
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default UpdateOrder
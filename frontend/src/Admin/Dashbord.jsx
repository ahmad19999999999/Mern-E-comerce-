import React, { useEffect } from 'react'
import '../Style/AdminStyles/Dashboard.css'
import Navbar from '../components/Navbar'
import PageTitle from '../components/PageTitle'
import {
  AddBox,
  AttachMoney,
  CheckCircle,
  Dashboard as DashboardIcon,
  Error,
  Instagram,
  Inventory,
  LinkedIn,
  People,
  ShoppingCart,
  Star,
  YouTube
} from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FetchAdminProduct, FetchAllOrders } from '../features/admin/AdminSlice'

const Dashbord = () => {
  const{products, orders} =useSelector((state)=>state.admin)
  const dispatsh=useDispatch()
  useEffect(()=>{
    dispatsh(FetchAdminProduct())
    dispatsh(FetchAllOrders())
  },[dispatsh])
  const totaleproducts=products.length
  const totalorders=orders.length
  const outofstock=products.filter((product)=>product.stock===0).length
  const instock=products.filter((product)=>product.stock>0).length
  const totaleRevenue=orders.reduce((acc, item) => acc + item.totaleprice, 0).toFixed(2)
  const totaleReviews=products.reduce((acc, item) => acc + item.reviews.length, 0)

  return (
    <>
      <PageTitle title="Admin Dashboard" />
      <Navbar/>
      <div className="dashboard-container">
        {/* Sidebar */}
        <div className="sidebar">
          <div className="logo">
            <DashboardIcon className="logo-icon" />
            Admin Dashboard
          </div>

          <nav className="nav-menu">
            <div className="nav-section">
              <h3>Products</h3>
              <Link to="/admin/products">
                <Inventory className="nav-icon" />
                All Products
              </Link>

              <Link to="/admin/product/create">
                <AddBox className="nav-icon" />
                Create Product
              </Link>
            </div>

            <div className="nav-section">
              <h3>Users</h3>
              <Link to="/admin/users">
                <People className="nav-icon" />
                All Users
              </Link>
            </div>

            <div className="nav-section">
              <h3>Orders</h3>
              <Link to="/admin/orders">
                <ShoppingCart className="nav-icon" />
                All Orders
              </Link>
            </div>

            <div className="nav-section">
              <h3>Reviews</h3>
              <Link to="/admin/reviewId">
                <Star className="nav-icon" />
                All Reviews
              </Link>
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="main-content">
          {/* Stats */}
          <div className="stats-grid">
            <div className="stat-box">
              <Inventory className="icon" />
              <h3>Total Products</h3>
              <p>{totaleproducts}</p>
            </div>

            <div className="stat-box">
              <ShoppingCart className="icon" />
              <h3>Total Orders</h3>
              <p>{totalorders}</p>
            </div>

            <div className="stat-box">
              <Star className="icon" />
              <h3>Total Reviews</h3>
              <p>{totaleReviews}</p>
            </div>

            <div className="stat-box">
              <AttachMoney className="icon" />
              <h3>Total Revenue</h3>
              <p>{totaleRevenue}</p>
            </div>

            <div className="stat-box">
              <Error className="icon" />
              <h3>Out Of Stock</h3>
              <p>{outofstock}</p>
            </div>

            <div className="stat-box">
              <CheckCircle className="icon" />
              <h3>In Stock</h3>
              <p>{instock}</p>
            </div>
          </div>

          {/* Social Media Stats (كلهم بداخل div واحد) */}
          <div className="social-stats">
            <div className="social-box instagram">
              <Instagram />
              <h3>Instagram</h3>
              <p>123K Followers</p>
              <p>12 Posts</p>
            </div>

            <div className="social-box linkedin">
              <LinkedIn />
              <h3>LinkedIn</h3>
              <p>12K Followers</p>
              <p>5 Posts</p>
            </div>

            <div className="social-box youtube">
              <YouTube />
              <h3>YouTube</h3>
              <p>50K Followers</p>
              <p>500 Posts</p>
            </div>
          </div>
        </div>
      </div>

     
    </>
  )
}

export default Dashbord

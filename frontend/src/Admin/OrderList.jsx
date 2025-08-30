import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Edit, Delete } from '@mui/icons-material'
import '../Style/AdminStyles/OrdersList.css'
import Navbar from '../components/Navbar'
import PageTitle from '../components/PageTitle'
import Footer from '../components/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { FetchAllOrders, removeError } from '../features/admin/AdminSlice'
import Loader from '../components/Loader'

const OrderList = () => {
  const {orders,loading,error,success} = useSelector((state)=>state.admin)
  console.log(orders)
  const dispatch=useDispatch()

   useEffect(() =>{
          dispatch(FetchAllOrders())
  
      },[dispatch])
  
      useEffect(() => {
        if (error) {
          toast.error(
            typeof error === 'string' ? error : error?.message || 'somthing is wrong',
            {
              position: 'top-center',
              autoClose: 3000,
            }
          );
          dispatch(removeError());
        }
      }, [dispatch, error]);

      if(orders && orders.length === 0){
        return <div className="no-orders-container"><p>No Orders Found</p></div>
      }


  return (
    <>
   {loading?(<Loader/>):(<>
      <Navbar />
      <PageTitle title="Orders List" />

      <div className="ordersList-container">
        <h1 className="ordersList-title">Orders List</h1>

        <div className="ordersList-table-container">
          <table className="ordersList-table">
            <thead>
              <tr>
                <th>SI NO</th>
                <th>Order ID</th>
                <th>Status</th>
                <th>Totale Price</th>
                <th>Number Of Item</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
             {orders&&orders.map((item,index)=>
              <tr key={item._id}>
                <td>{index+1}</td>
                <td>{item._id}</td>
                <td>
                  <span className={`order-status ${item.orderStatus.toLowerCase()}`}>{item.orderStatus}</span>
                </td>
                <td>{item.totaleprice}</td>
                <td>{item.orderItem.length}</td>
                <td>
                  <Link to={`/admin/order/${item._id}`} className="action-icon edit-icon">
                    <Edit/>
                  </Link>
                  <button className="action-icon delete-icon">
                    <Delete />
                  </button>
                </td>
              </tr>

             )
          }
              
            </tbody>
          </table>
        </div>
      </div>

      <Footer />
    </>)}
    </>
  )
}

export default OrderList

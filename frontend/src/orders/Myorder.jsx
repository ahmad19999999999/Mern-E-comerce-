import React, { useEffect } from 'react';
import '../Style/OrderStyles/MyOrders.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageTitle from '../components/PageTitle';
import { Link } from 'react-router-dom';
import { LaunchOutlined } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders, removeError } from '../features/order/OrderSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

const MyOrders = () => {
  const { orders, loading, error } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());

    if (error && !toast.isActive('error-toast')) {
      toast.error(error, {
        toastId: 'error-toast',
        position: 'top-center',
        autoClose: 3000,
      });
      dispatch(removeError());
    }
  }, [error, dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <PageTitle title="My Orders" />
          <Navbar />
          <div className="my-orders-container">
            {orders && orders.length > 0 ? (
              <>
                <h1>My Orders</h1>
                <div className="table-responsive">
                  <table className="orders-table">
                    <thead>
                      <tr>
                        <th>Order Id</th>
                        <th>Items Count</th>
                        <th>Status</th>
                        <th>Total Price</th>
                        <th>View Order</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order._id}>
                          <td>{order._id}</td>
                          <td>{order.orderItem.length}</td>
                          <td>{order.orderStatus}</td>
                          <td>{order.totaleprice}</td>
                          <td>
                            <Link to={`/order/${order._id}`} className="order-link">
                              <LaunchOutlined />
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <div className="no-orders">
                <p className="no-order-message">You have no orders yet.</p>
              </div>
            )}
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default MyOrders;

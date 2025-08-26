import React, { useState } from 'react';
import '../Style/UserStyles/UserDashboard.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, removeAccess } from '../features/user/userslice';
import { toast } from 'react-toastify';


const UserDashboard = ({ user }) => {
  const avatarUrl = user?.avatar?.url || '/images/profile.jpg';
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuvisible, setmenuvisible] = useState(false);
   const { cartItem } = useSelector((state) => state.cart);

  function toggleMenu() {
    setmenuvisible(!menuvisible);
  }

  function orders() {
    navigate('/getmy/orders');
  }
  function profile() {
    navigate('/profile');
  }
   function cart() {
    navigate('/cart');
  }
  function logoutuser() {
    dispatch(logout()).unwrap().then(() => {
      toast.success('Logout successful', {
        position: 'top-center',
        autoClose: 3000,
      });
      dispatch(removeAccess()); // optional
      navigate('/login');
    }).catch(() => {
      toast.error('Logout failed. Please try again.');
    });
  }
  function dashbord() {
    navigate('/admin/dashbord');
  }

  const options = [
    { name: 'Orders', funcName: orders },
    { name: 'Account', funcName: profile },
     { name: `Cart(${cartItem.length})`, funcName: cart,iscart:true },
    { name: 'Logout', funcName: logoutuser },
    
  ];

  if (user.role === 'admin') {
    options.unshift({
      name: 'Dashbord', funcName: dashbord
    });
  }

  return (
    <>
      
      <div className={`overlay ${menuvisible ? 'show' : ''}`}></div>
      <div className='dashboard-container'>
        <div className='profile-header' onClick={toggleMenu}>
          <img
            src={avatarUrl}
            alt="profile"
            className='profile-avatar'
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/images/profile.jpg';
            }}
          />
          <span className='profile-name'>
            {user.name || 'user'}
          </span>
        </div>
      {menuvisible && (
  <div className="menu-options">
    {options.map((item) => (
      <button
        key={item.name}
        className={`menu-option-btn ${item.iscart ? (cartItem.length > 0 ? 'cart-not-empty' : '') : ''}`}
        onClick={item.funcName}
      >
        {item.name}
      </button>
    ))}
  </div>
)}

  
      </div>
      
    </>
  );
};

export default UserDashboard;

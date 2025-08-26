import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loaduser } from '../features/user/userslice.js';  // تأكد من المسار الصحيح
import { Link, useNavigate } from 'react-router-dom';
import '../Style/UserStyles/Profile.css';
import PageTitle from '../components/PageTitle.jsx';
import Loader from '../components/Loader.jsx';

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, user, isAuthenticated } = useSelector((state) => state.user);

  // تحميل بيانات المستخدم عند تحميل الصفحة
/*useEffect(() => {
    if (!user) {
      dispatch(loaduser());
    }
  }, [dispatch, user]);*/

  // التوجيه إلى صفحة تسجيل الدخول إذا لم يكن المستخدم مسجلاً الدخول
  useEffect(() => {
    if (isAuthenticated === false) {
      navigate('/login');
    }
  }, [isAuthenticated]);

  const avatarUrl = user?.avatar?.url || '/images/profile.jpg';

  if (loading || !user) {
    return <Loader />;
  }

  return (
    <div className='profile-container'>
      <PageTitle title={`${user.name}'s profile`} />
      <div className='profile-image'>
        <h1 className='profile-heading'>My Profile</h1>
        <img src={avatarUrl} alt="User Profile" className='profile-photo' />
        <Link to='/update/profile'>Edit Profile</Link>
      </div>
      <div className='profile-details'>
        <div className='profile-detail'>
          <h2>Username:</h2>
          <p>{user.name}</p>
        </div>
        <div className='profile-detail'>
          <h2>Email:</h2>
          <p>{user.email}</p>
        </div>
        <div className='profile-detail'>
          <h2>Joined On:</h2>
          <p>{new Date(user.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
      <div className='profile-buttons'>
        <Link to='/getmy/orders'>My Orders</Link>
        <Link to='/update/password'>Change Password</Link>
      </div>
    </div>
  );
};

export default Profile;

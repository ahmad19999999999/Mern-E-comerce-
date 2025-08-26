import React, { useEffect, useState } from 'react';
import '../Style/UserStyles/Form.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeAccess, removeError, UpdateProfile } from '../features/user/userslice.js';
import { toast } from 'react-toastify';
import Loader from '../components/Loader'

const Updateprofile = () => {
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [avatar, setavatar] = useState('');
  const [avatarprev, setavatarprev] = useState('./images/profile.jpg');

  const { message, user, success, loading, error } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const ProfileImageUpdate = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setavatarprev(reader.result);
          setavatar(file);
        }
      };
      reader.readAsDataURL(file); // ✅ مصحح
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set('name', name);
    formData.set('email', email);
    formData.set('avatar', avatar);
    dispatch(UpdateProfile(formData));
  };

  useEffect(() => {
    if (user) {
      setname(user.name || '');
      setemail(user.email || '');
      setavatarprev(user.avatar?.url || './images/profile.jpg');
    }
  }, [user]);

  useEffect(() => {
    if (error) {
      toast.error(
        typeof error === 'string' ? error : error?.message || 'Something went wrong',
        {
          position: 'top-center',
          autoClose: 3000,
        }
      );
      dispatch(removeError());
    }
  }, [dispatch, error]);

  useEffect(() => {
    if (success) {
      toast.success(message, {
        position: 'top-center',
        autoClose: 3000,
      });
      dispatch(removeAccess());
      navigate('/profile');
    }
  }, [dispatch, success]);

  return (
    <>
   {loading ?(<Loader/>): (<>
      <Navbar />
      <div className='container update-container'>
        <div className='form-content'>
          <form className='form' onSubmit={handleSubmit} encType='multipart/form-data'>
            <h2>Update Profile</h2>

            <div className='input-group avatar-group'>
              <input
                type="file"
                accept="image/*"
                className='file-input'
                onChange={ProfileImageUpdate}
              />
              <img src={avatarprev} alt="User Profile" className='avatar' />
            </div>

            <div className='input-group'>
              <input
                type="text"
                value={name}
                onChange={(e) => setname(e.target.value)}
                placeholder="Enter your name"
                required
              />
            </div>

            <div className='input-group'>
              <input
                type="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>

            <button className='authBtn' type="submit" disabled={loading}>
              {loading ? 'Updating...' : 'Update'}
            </button>
          </form>
        </div>
      </div>
      <Footer />
   
    </>)}
    </>
  );
  
};

export default Updateprofile;

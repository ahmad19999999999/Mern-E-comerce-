import React, { useEffect, useState } from 'react'
import '../Style/UserStyles/Form.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { removeAccess, removeError, UpdatePassword } from '../features/user/userslice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../components/Loader'
import PageTitle from '../components/PageTitle';
const Updatepassword = () => {
    const[oldpassword,setoldpassword]=useState('')
    const[confirmpassword,setconfirmpassword]=useState('')
    const[newpassword,setnewpassword]=useState('')


   const {success, loading, error } = useSelector(state => state.user);
   const navigate = useNavigate();
   const dispatsh=useDispatch()

 const UpdatePasswordSubmit = (e) => {
  e.preventDefault();

  const userData = {
    oldpassword, // مطابق لما ينتظره الباكيند
    newpassword,
    confirmpassword,
  };

  dispatsh(UpdatePassword(userData));
};

     useEffect(() => {
        if (error) {
          toast.error(
            typeof error === 'string' ? error : error?.message || 'Something went wrong',
            {
              position: 'top-center',
              autoClose: 3000,
            }
          );
          dispatsh(removeError());
        }
      }, [dispatsh, error]);
    
      useEffect(() => {
        if (success) {
          toast.success("password update successfly", {
            position: 'top-center',
            autoClose: 3000,
          });
          dispatsh(removeAccess());
          navigate('/profile');
        }
      }, [dispatsh, success]);
  return (
    <>
   {loading ? (<Loader/>) : ( <>
    <PageTitle title='update password' />
    <Navbar/>
    <div className='container update-container'>
        <div className='form-content'>
            <form className='form' onSubmit={UpdatePasswordSubmit}>
            <h2>Update Password</h2>

            <div className='input-group'>
              <input
                type="password"
                name='oldpassword'
                placeholder="old password"
                value={oldpassword}
                onChange={(e) => setoldpassword(e.target.value)}
                required
              />
            </div>

            <div className='input-group'>
              <input
                type="password"
                name='newpassword'
                placeholder="new password"
                value={newpassword}
                onChange={(e) => setnewpassword(e.target.value)}
                required
              />
            </div>

            
            <div className='input-group'>
              <input
                type="password"
                name='confirmpassword'
                placeholder="confirm password"
                value={confirmpassword}
                onChange={(e) => setconfirmpassword(e.target.value)}
                required
              />
            </div>
            < button className='authBtn' type="submit" disabled={loading}>
              {loading ? 'Updating...' : 'Update'}
            </button>
          </form>
        </div>
         
    </div>




    <Footer/>
    </>)}
    </>
  )
}

export default Updatepassword
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../Style/UserStyles/Form.css';
import { ForgatePassword, removeAccess, removeError } from '../features/user/userslice.js';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageTitle from '../components/PageTitle.jsx';
import Loader from '../components/Loader.jsx';

const Forgetpassword = () => {
    const [email,setemail]=useState('')
       const { message,success, loading, error } = useSelector(state => state.user);
   const navigate = useNavigate();
   const dispatsh=useDispatch()

    const forgatePasswordSubmit=(e)=>{

        e.preventDefault();
        
          const userData = {
            email
          };
        
          dispatsh(ForgatePassword(userData));
          setemail('')
    }

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
              toast.success(message, {
                position: 'top-center',
                autoClose: 3000,
              });
              dispatsh(removeAccess());
            }
          }, [dispatsh, success]);
  return (
<>
     {loading ? (<Loader/>):(<>
      <PageTitle title='forgate password' />
     <Navbar/>
    <div className='container update-container'>
        <div className='form-content'>
            <form className='form' onSubmit={forgatePasswordSubmit}>
            <h2>Forgate Password</h2>

            <div className='input-group'>
              <input
                type="email"
                name='email'
                placeholder="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
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

export default Forgetpassword
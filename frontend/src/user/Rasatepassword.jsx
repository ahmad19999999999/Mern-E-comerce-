import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import PageTitle from '../components/PageTitle'
import '../Style/UserStyles/Form.css';
import { RasetePassword, removeAccess, removeError } from '../features/user/userslice';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

const Rasatepassword = () => {
    const [password,setpassword]=useState('')
    const [confirmpassword,setconfirmpassword]=useState('')
    const { token } = useParams();


     const {success, loading, error } = useSelector(state => state.user);
   const navigate = useNavigate();
   const dispatsh=useDispatch()

    const resatePasswordSubmit=(e)=>{
        e.preventDefault();
       
         const userData = {
           password, // مطابق لما ينتظره الباكيند
           confirmpassword,
           
         }
         
         dispatsh(RasetePassword({userData,token}));

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
              toast.success("password resate successfly", {
                position: 'top-center',
                autoClose: 3000,
              });
              dispatsh(removeAccess());
              navigate('/login');
            }
          }, [dispatsh, success]);

  return (
    <>
   {loading ? (<Loader/>) : (<>
     <PageTitle title='resate password' />
    <Navbar/>
    <div className='container update-container'>
        <div className='form-content'>
            <form className='form' onSubmit={resatePasswordSubmit}>
            <h2>Resate Password</h2>

            <div className='input-group'>
              <input
                type="password"
                name='password'
                placeholder="password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
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

             <button className='authBtn' type="submit" disabled={loading}>
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

export default Rasatepassword
import React, { useState, useEffect } from 'react';
import '../Style/UserStyles/Form.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, removeError } from '../features/user/userslice';
import { toast } from 'react-toastify';

const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location=useLocation()

  const redirect=new URLSearchParams(location.search).get('redirect')||'/'
  

  const { loading, error, isAuthenticated } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = user;

    if (!email || !password) {
      toast.error('Please fill all fields', {
        position: 'top-center',
        autoClose: 3000,
      });
      return;
    }

    dispatch(login({ email, password }));
  };

  useEffect(() => {
    if (error) {
      toast.error(typeof error === 'string' ? error : error.message || 'Login failed', {
        position: 'top-center',
        autoClose: 3000,
      });
      dispatch(removeError());
    }

    if (isAuthenticated) {
    // إذا كان redirect مش للشحن، أظهر الرسالة
    if (redirect !== '/shipping') {
      toast.success('Login successful', {
        position: 'top-center',
        autoClose: 3000,
      });
    }
    navigate(redirect);
  }
}, [dispatch, error, isAuthenticated, navigate, redirect]);

  return (
    <div className="form-container container">
      <div className="form-content">
        <form className="form" onSubmit={handleSubmit}>
          <h2>Sign In</h2>
          <div className="input-group">
            <input
              type="text"
              placeholder="Email"
              name="email"
              value={user.email}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={user.password}
              onChange={handleChange}
            />
          </div>
          <button className="authBtn" disabled={loading}>
            {loading ? 'Loading...' : 'Login'}
          </button>
          <p className="form-links">
            Don’t have an account? <Link to="/register">Sign up here</Link>
          </p>
          <p className="form-links">
            Forget your password? <Link to="/forgate/password">Reset here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

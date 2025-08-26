import React, { useEffect, useState } from 'react';
import '../Style/UserStyles/Form.css';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { register, removeError } from '../features/user/userslice';

const Register = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState('./images/profile.jpg');

  const dispatch = useDispatch();
  const navigate=useNavigate()
  const { loading, error, success } = useSelector((state) => state.user);

  const RegisterDataChange = (e) => {
    if (e.target.name === 'avatar') {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            setAvatarPreview(reader.result);
            setAvatar(file);
          }
        };
        reader.readAsDataURL(file);
      }
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const registerSubmit = (e) => {
    e.preventDefault();
    const { name, email, password } = user;

    if (!name || !email || !password) {
      toast.error('Please fill all fields', {
        position: 'top-center',
        autoClose: 3000,
      });
      return;
    }

    if (avatar) {
      const formData = new FormData();
      formData.set('name', name);
      formData.set('email', email);
      formData.set('password', password);
      formData.set('avatar', avatar);
      dispatch(register(formData));
    } else {
      dispatch(register({ name, email, password }));
    }
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
      dispatch(removeError());
    }

    if (success) {
      toast.success('Registered successfully!', {
        position: 'top-center',
        autoClose: 3000,
      });
      navigate('/');
    }
   
  }, [dispatch, error, success]);

  return (
    <div className="form-container container">
      <div className="form-content">
        <form className="form" onSubmit={registerSubmit}>
          <h2>Sign Up</h2>
          <div className="input-group">
            <input
              type="text"
              placeholder="Username"
              name="name"
              value={user.name}
              onChange={RegisterDataChange}
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              placeholder="Email"
              name="email"
              value={user.email}
              onChange={RegisterDataChange}
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={user.password}
              onChange={RegisterDataChange}
            />
          </div>
          <div className="input-group avatar-group">
            <input
              type="file"
              name="avatar"
              className="file-input"
              accept="image/*"
              onChange={RegisterDataChange}
            />
            <img src={avatarPreview} alt="avatar preview" className="avatar" />
          </div>
          <button className="authBtn" disabled={loading}>
            {loading ? 'Loading...' : 'Sign Up'}
          </button>
          <p className="form-links">
            Already have an account? <Link to="/login">Sign in here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;

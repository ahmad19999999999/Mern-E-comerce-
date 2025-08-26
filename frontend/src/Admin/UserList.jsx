import React, { useEffect, useState } from 'react';
import "../Style/AdminStyles/UsersList.css";
import { Edit, Delete } from "@mui/icons-material";
import { Link } from "react-router-dom";
import Navbar from '../components/Navbar';
import PageTitle from '../components/PageTitle';
import Footer from '../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteUser, FetchAllUsers, removeAccess, removeError } from '../features/admin/AdminSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

const UserList = () => {
  // بيانات تجريبية (dummy)
/*  const users = [
    { _id: "1", name: "أحمد", email: "ahmed@example.com", role: "admin", createdAt: "2024-06-01" },
    { _id: "2", name: "سارة", email: "sara@example.com", role: "user", createdAt: "2024-07-10" },
  ];*/
  const{users,loading,error,success}=useSelector((state)=>state.admin)

  const dispatch=useDispatch()

// 1️⃣ useEffect الأول: ينفذ الجلب مرة وحدة عند التحميل
useEffect(() => {
  dispatch(FetchAllUsers());
}, [dispatch]);

// 2️⃣ useEffect الثاني: يعرض رسالة الخطأ مرة واحدة
useEffect(() => {
  if (error) {
    toast.error("failed to fetch users", {
      position: "top-center",
      autoClose: 3000,
      toastId: "fetchError"
    });
    dispatch(removeError()); // reset error
  }
}, [error, dispatch]);

// 3️⃣ useEffect الثالث: يعرض رسالة النجاح مرة واحدة
useEffect(() => {
  if (success) {
    toast.success("users fetched successfully", {
      position: "top-center",
      autoClose: 3000,
      toastId: "fetchSuccess"
      
    });
    dispatch(removeAccess()); // reset success
  }
}, [success, dispatch]);


const handeldelete=async(userId)=>{
  const confirmDelete = window.confirm("Are you sure you want to delete this user?");
  if(!confirmDelete)return;
  try {
    await dispatch(DeleteUser(userId)).unwrap();
  toast.success("User deleted successfully",{position:"top-center",autoClose:3000,toastId:"deleteSuccess"});
  dispatch(removeAccess())
  } catch (error) {
    toast.error("Failed to delete user",{position:"top-center",autoClose:3000,toastId:"deleteError"});
    dispatch(removeError())
    
  }
  
}

  return (
    <>
    {loading ? (<Loader/>):(<>
    <PageTitle title={'Users List'}/>
    <Navbar/>
    <div className="usersList-container">
      <h1 className="usersList-title">All Users</h1>

      <div className="usersList-table-container">
        <table className="usersList-table">
          <thead>
            <tr>
              <th>Sl No</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{new Date(user.createdAt).toLocaleString()}</td>
                <td>
                  <Link to={`/admin/user/${user._id}`} className="action-icon edit-icon">
                    <Edit />
                  </Link>
                  <button className="action-icon delete-icon" onClick={()=>handeldelete(user._id)}>
                    <Delete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    <Footer/>
    </>)}
    </>
  );
};

export default UserList;

import React, { useEffect, useState } from "react";
import "../Style/AdminStyles/UpdateRole.css";
import PageTitle from "../components/PageTitle";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getSingelUser, removeAccess, removeError, UpdateRoleUser } from "../features/admin/AdminSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const UpdateUserRole = () => {
  const { id } = useParams(); // user ID from URL
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading, error, success } = useSelector((state) => state.admin);

  // Form state
  const [formdata, setformdata] = useState({ name: "", email: "", role: "" });
  const { name, email, role } = formdata;

  // Fetch single user when component loads
  useEffect(() => {
    if (id) dispatch(getSingelUser(id));
  }, [dispatch, id]);

  // Update form when user data is loaded
  useEffect(() => {
    if (user) {
      setformdata({
        name: user.name || "",
        email: user.email || "",
        role: user.role || ""
      });
    }
  }, [user]);

  // Handle role update
  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(UpdateRoleUser({ id, role }));
  };

  // Handle success & errors
  useEffect(() => {
    if (success) {
      toast.success("User role updated successfully!", { position: "top-center", autoClose: 3000 });
      dispatch(removeAccess());
      navigate("/admin/users");
    }
    if (error) {
      toast.error(error || "Failed to update user role", { position: "top-center", autoClose: 3000 });
      dispatch(removeError());
    }
  }, [success, error, dispatch, navigate]);

  if (loading || !user) return <Loader />;

  return (
    <>
      <PageTitle title="Update User Role" />
      <Navbar />
      <div className="page-wrapper">
        <div className="update-user-role-container">
          <h1>Update User Role</h1>
          <form className="update-user-role-form" onSubmit={handleUpdate}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" value={name} readOnly />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" value={email} readOnly />
            </div>

            <div className="form-group">
              <label htmlFor="role">Role</label>
              <select
                id="role"
                value={role}
               onChange={(e) => {
              setformdata({ ...formdata,role: e.target.value });
                  console.log("Selected role:", e.target.value);
                    }}
                  >
                <option value="">Select Role</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button type="submit" className="btn">Update Role</button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UpdateUserRole;

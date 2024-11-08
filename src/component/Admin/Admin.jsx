import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getUser } from "../../Store/State/Auth/Action";
import AdminLoginForm from "./AdminLoginForm";
import AdminRegisterForm from "./AdminRegisterForm";

const Admin = () => {
    const navigate = useNavigate();
      const jwt = localStorage.getItem("jwt");
      console.log("jwt is", jwt);
      const { auth } = useSelector((store) => store);

      console.log("authdata", auth);
      const dispatch = useDispatch();
      const location = useLocation();

useEffect(() => {
  const jwt = localStorage.getItem("jwt");
  if (jwt) {
    dispatch(getUser(jwt));
  }
}, [dispatch, jwt, auth.jwt]);
     useEffect(() => {
       // Check if auth.user is available and contains the role
       if (auth.user?.userProfile) {
         // If the user is ADMIN, navigate to the admin dashboard
         if (auth.user.userProfile.role === "ADMIN") {
           navigate("/admin/admin/adminDashboard");
         } else {
           // If the user is not ADMIN, redirect to the login page
            localStorage.removeItem("jwt");
           navigate("/admin/admin/login");
         }
       }
     }, [auth.user, navigate]);
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-r from-[#b1a365] via-[#C0C0C0] to-[#E5E4E2]">
      <div className="absolute top-32 text-center">
        <h1 className="text-4xl font-bold text-white drop-shadow-md">
          Admin Login
        </h1>
        <p className="text-white opacity-80 mt-2">
          Welcome to the Admin Dashboard...
        </p>
      </div>
      <div className="bg-white p-8 pt-12 rounded-lg shadow-2xl w-full max-w-md z-10">
        {location.pathname === "/admin/admin/login" ? <AdminLoginForm/> : <AdminRegisterForm />}
      </div>
    </div>
  );
};

export default Admin;

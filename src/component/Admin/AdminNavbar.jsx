import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
   const jwt = localStorage.getItem("jwt");
   console.log("jwt is", jwt);
   const { auth } = useSelector((store) => store);

const AdminNavbar = () => {
    const navigate=useNavigate();
       const dispatch = useDispatch();
     const handleLogout = () => {
       dispatch(logout());
       localStorage.removeItem("jwt");
       navigate("/");
     };
  return (
    <div>
      AdminNavbar
     
    </div>
  );
}

export default AdminNavbar
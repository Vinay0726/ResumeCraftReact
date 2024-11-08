import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminDashboard from "../component/Admin/AdminDashboard";
import Admin from "../component/Admin/Admin";


const AdminRouters = () => {
  return (
    <div>
      <Routes>
        {/* Admin authentication routes */}
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/login" element={<Admin />} />
        <Route path="/admin/register" element={<Admin />} />

        {/* Admin dashboard and nested routes */}
        <Route path="/admin/adminDashboard/*" element={<AdminDashboard />} />

       
      </Routes>
    </div>
  );
};

export default AdminRouters;

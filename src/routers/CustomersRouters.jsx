import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../component/Navbar";
import Homepage from "../component/Homepage";
import UserDashboard from "../component/User/UserDashboard";
import UpdateProfile from "../component/User/UpdateProfile";
import TemplateList from "../component/User/TemplatesData/Templatelist";
import TemplateDetails from "../component/User/TemplatesData/TemplateDetails";
import ResumeDisplay from "../component/User/TemplatesData/ResumeDisplay";

const CustomersRouters = () => {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Homepage />} />
        <Route path="/register" element={<Homepage />} />
        <Route path="/userdashboard" element={<UserDashboard />} />
        <Route path="/resumedisplay" element={<ResumeDisplay />} />
        <Route path="/updateprofile" element={<UpdateProfile />} />
        <Route path="/templatelist" element={<TemplateList />} />
        <Route path="/templates/:templateName" element={<TemplateDetails />} />
      </Routes>
    </div>
  );
};

export default CustomersRouters;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, Routes, Route } from "react-router-dom";
import { logout } from "../../Store/State/Auth/Action";
import AddTemplate from "./SlideBar/AddTemplate";
import TemplateList from "./SlideBar/TemplateList";
import { Button, IconButton, Drawer } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import Profile from "./SlideBar/Profile";
import TemplateDetails from "./SlideBar/TemplateDetails";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [mobileOpen, setMobileOpen] = useState(false);
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("jwt");
    navigate("/admin/admin");
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const sidebarContent = (
    <div className="flex flex-col items-center justify-center space-y-4 p-5">
      <h2 className="text-5xl font-bold mb-5 text-center">Admin Panel</h2>
      <Link to="addTemplate">
        <Button
          startIcon={<AddBoxIcon />}
          className="w-full  text-center text-white hover:text-gray-300"
        >
          Add Template
        </Button>
      </Link>
      <Link to="templateList">
        <Button
          startIcon={<ListAltIcon />}
          className="w-full text-center text-white hover:text-gray-300"
        >
          List Templates
        </Button>
      </Link>
      <Link to="profile">
        <Button
          startIcon={<AccountCircleIcon />}
          className="w-full text-center text-white hover:text-gray-300"
        >
          Profile
        </Button>
      </Link>
      <Button
        onClick={handleLogout}
        startIcon={<LogoutIcon />}
        className="w-full text-center text-white hover:text-gray-300"
      >
        Logout
      </Button>
    </div>
  );

  return (
    <div className="flex h-screen">
      {/* Sidebar Toggle Button for Mobile (visible only on small screens) */}
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        className="sm:block md:hidden absolute top-4 left-4"
        onClick={handleDrawerToggle}
      >
        <MenuIcon className="md:text-white md:p-4" />
      </IconButton>

      {/* Sidebar */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        classes={{
          paper: "w-64 bg-gray-800 text-white",
        }}
        ModalProps={{
          keepMounted: true,
        }}
        className="md:hidden"
      >
        {sidebarContent}
      </Drawer>

      {/* Persistent Sidebar for larger screens (laptops, tablets, desktops) */}
      <div className="hidden md:flex w-1/4 bg-gray-800 text-white">
        <div className="flex flex-col items-center justify-center w-full">
          {sidebarContent}
        </div>
      </div>

      {/* Right Side - Content */}
      <div className="flex-1 p-5">
        <Routes>
          <Route path="addTemplate" element={<AddTemplate />} />
          <Route path="templateList" element={<TemplateList />} />
          <Route path="profile" element={<Profile />} />
          <Route
            path="/templates/:templateName"
            element={<TemplateDetails />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;

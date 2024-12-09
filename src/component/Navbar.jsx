
import React, { useEffect, useState } from 'react'
import AuthModel from './Auth/AuthModel';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { getUser, logout } from '../Store/State/Auth/Action';
import { div } from 'framer-motion/client';

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
     const [openAuthModal, setOpenAuthModal] = useState(false);

      const jwt = localStorage.getItem("jwt");
      console.log("jwt is",jwt)
      const { auth } = useSelector((store) => store);

        console.log("authdata",auth);
        const dispatch = useDispatch();
        const location = useLocation();


      const handleOpen = () => {
        setOpenAuthModal(true);
      };
      const handleClose = () => {
        setOpenAuthModal(false);
      };

       useEffect(() => {
         const jwt = localStorage.getItem("jwt");
         if (jwt) {
           dispatch(getUser(jwt));
         }
       }, [dispatch,jwt, auth.jwt]);

        // useEffect(() => {
        //   if (auth.user?.userProfile) handleClose();
        //   if (["/login", "/register"].includes(location.pathname)) {
        //     navigate("/userdashboard");
        //   }
        // }, [auth.user]);
        useEffect(() => {
          // Check if auth.user is available and contains the role
          if (auth.user?.userProfile) {
            // If the user is USER, navigate to the admin dashboard
            if (auth.user.userProfile.role === "USER") {
              if (["/login", "/register"].includes(location.pathname)) {
            navigate("/userdashboard");
            handleClose();
               }
              
            } else {
              // If the user is not USER, redirect to the login page
                 localStorage.removeItem("jwt");
              navigate("/login");
            }
          }
        }, [auth.user, navigate]);

         const handleLogout = () => {
           dispatch(logout());
           localStorage.removeItem("jwt");
           navigate("/");
         };
 const handleTemplates = () => {

  navigate("/templatelist");
   
}


  return (
    <div>
      <div className="w-full flex justify-between items-center h-20 bg-gray-100">
        <div
          className="p-2 text-green-600 text-3xl font-bold"
          onClick={() => navigate("/userdashboard")}
        >
          ResumeCraft
        </div>

        <div className="flex items-center p-5 gap-5">
          {auth.user?.userProfile?.firstName &&
          auth.user?.userProfile?.role === "USER" ? (
            <div className="flex h-full items-center gap-5">
              {" "}
              <a
                onClick={handleTemplates}
                className="lg:text-xl lg:text-gray-500 text-sm font-medium text-gray-700 hover:text-gray-800"
              >
                Templates
              </a>
              <button
                onClick={() => navigate("/updateprofile")}
                className="bg-blue-300 text-white  h-12 w-12 text-center font-semibold text-xl rounded-full"
                variant="contained"
              >
                {auth.user?.userProfile?.firstName[0].toUpperCase()}
              </button>
              <a
                onClick={handleLogout}
                className="lg:text-xl lg:text-gray-500 text-sm font-medium text-gray-700 hover:text-gray-800"
              >
                Logout
              </a>
            </div>
          ) : (
            <a
              onClick={handleOpen}
              className="lg:text-xl lg:text-gray-500 text-sm font-medium text-gray-700 hover:text-gray-800"
            >
              Sign in
            </a>
          )}
        </div>
      </div>
      <AuthModel handleClose={handleClose} open={openAuthModal} />
    </div>
  );
}

export default Navbar
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import AuthModel from "./Auth/AuthModel";

const Homepage = () => {
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt"); // Check if JWT is in local storage
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const handleGetStarted = () => {
    if (jwt) {
      // If JWT exists, navigate to the dashboard
      navigate("/userdashboard");
      handleClose()
    } else {
      // If no JWT, navigate to the login page
      handleOpen()
    }
  };

      const handleOpen = () => {
        setOpenAuthModal(true);
      };
      const handleClose = () => {
        setOpenAuthModal(false);
      };
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-300 to-indigo-400 text-white">
      {/* Hero Section */}
      <section className="text-center px-6 py-12">
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Build Your Professional Resume with Ease
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Design a stunning resume with just a few clicks. Save, update, and
          manage your resumes effortlessly. Choose from our modern customizable
          templates.
        </motion.p>
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <button
            onClick={handleGetStarted} // Call the function to conditionally navigate
            className="bg-white text-blue-600 hover:bg-blue-100 font-semibold py-3 px-6 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            Get Started
          </button>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="w-full max-w-5xl px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <motion.div
          className="bg-white text-blue-600 p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105"
          whileHover={{ scale: 1.05 }}
        >
          <h3 className="text-2xl font-semibold mb-3">Easy to Use</h3>
          <p>
            Our user-friendly interface makes it simple to create a resume
            step-by-step.
          </p>
        </motion.div>

        <motion.div
          className="bg-white text-blue-600 p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105"
          whileHover={{ scale: 1.05 }}
        >
          <h3 className="text-2xl font-semibold mb-3">
            Customizable Templates
          </h3>
          <p>
            Choose from a variety of templates to suit your style and
            professional needs.
          </p>
        </motion.div>

        <motion.div
          className="bg-white text-blue-600 p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105"
          whileHover={{ scale: 1.05 }}
        >
          <h3 className="text-2xl font-semibold mb-3">Download in PDF</h3>
          <p>Save your resume as a PDF with just one click for easy sharing.</p>
        </motion.div>
      </section>

      {/* Decorative Element */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-300 opacity-20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-300 opacity-20 rounded-full blur-3xl"></div>

      {/* Footer */}
      <footer className="w-full sm:absolute bottom-0 text-center py-6 bg-gradient-to-r from-blue-400 to-indigo-500 text-white">
        <p className="text-sm">© 2024 ResumeCraft. All Rights Reserved.</p>
      </footer>
      <AuthModel handleClose={handleClose} open={openAuthModal} />
    </div>
  );
};

export default Homepage;

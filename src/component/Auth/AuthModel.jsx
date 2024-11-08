import { Box, Modal } from "@mui/material";
import React from "react";
import RegisterForm from "./RegisterForm";
import { useLocation } from "react-router-dom";
import LoginForm from "./LoginForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {
    xs: "90%", // 90% width for extra-small screens (mobile)
    sm: 500, // 
    md: 500, // 500px width for medium and larger screens
  },
  bgcolor: "background.paper",
  outline: "none",
  boxShadow: 24,
  p: 4,
};

const AuthModel = ({ handleClose, open }) => {
    const location=useLocation();
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {location.pathname ==="/login"?<LoginForm/>:<RegisterForm/>}
      </Box>
    </Modal>
  );
};

export default AuthModel;

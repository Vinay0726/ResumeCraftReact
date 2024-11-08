import { Button, Grid, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser, register } from "../../Store/State/AdminAuth/Action";



const AdminRegisterForm = () => {
    const navigate=useNavigate();
    const dispatch=useDispatch();
     const jwt=localStorage.getItem("jwt");
     const {auth}=useSelector(store=>store)
    useEffect(()=>{
      if(jwt){
       dispatch(getUser(jwt));
      }
    
    },[jwt,auth.jwt])

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const userData = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      password: data.get("password"),
    };
    dispatch(register(userData))

    console.log("userdata", userData);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <form onSubmit={handleSubmit}>
        {" "}
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First Name"
              fullWidth
              variant="outlined"
              autoComplete="given-name"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Last Name"
              fullWidth
              variant="outlined"
              autoComplete="given-name"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="email"
              name="email"
              label="Email"
              fullWidth
              variant="outlined"
              autoComplete="email"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="password"
              name="password"
              label="Password"
              fullWidth
              variant="outlined"
              autoComplete="password"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              className="bg-[#9155FD] w-full"
              type="submit"
              variant="contained"
              size="large"
              sx={{ padding: "1rem ", bgcolor: "#9155FD" }}
            >
              Register
            </Button>
          </Grid>
        </Grid>
      </form>
      <div className="p-4 mt-3 flex w-full justify-center text items-center">
        <p> Already have an account?</p>{" "}
        <button
          className="ml-3 text-base text-green-500"
          onClick={() => navigate("/admin/admin/login")}
          size="medium"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default AdminRegisterForm;

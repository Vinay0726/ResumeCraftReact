import { Button, Grid, TextField } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../Store/State/AdminAuth/Action";


const AdminLoginForm = () => {
    const navigate=useNavigate();
    const dispatch=useDispatch();

    
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const userData = {
      email: data.get("email"),
      password: data.get("password"),
    };
    dispatch(login(userData));
    console.log("userData",userData)

  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {" "}
        <Grid container spacing={3}>
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
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
      <div className="p-4 mt-3 flex w-full justify-center text items-center">
        <p> If You Don't have account?</p>{" "}
        <button
          className="ml-3 text-base text-blue-500"
          onClick={() => navigate("/admin/admin/register")}
          size="medium"
        >
          REGISTER
        </button>
      </div>
    </div>
  );
};

export default AdminLoginForm;

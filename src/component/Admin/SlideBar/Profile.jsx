import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Container,
  Card,
  CardContent,
  Divider,
  InputAdornment,
  IconButton,
} from "@mui/material";
import {
  Person,
  Email,
  Lock,
  Phone,
  ArrowBack,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUser } from "../../../Store/State/Auth/Action";
import { API_BASE_URL } from "../../../config/apiConfig";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);

  // State for form inputs
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    mobileNumber: "",
  });

  // State for password visibility toggle
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.userProfile?.firstName || "",
        lastName: user.userProfile?.lastName || "",
        email: user.userProfile?.email || "",
        mobileNumber: user.userProfile?.mobileNumber || "",
        password: "", // Clear password field for security
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form with data:", formData);

    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/admin/updateAdmin`,
        { ...formData },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );

      console.log("Response after API call:", response.data);
      toast.success("Profile updated successfully!");
      navigate("/admin/admin/adminDashboard/profile");
    } catch (error) {
      console.error(
        "Error updating profile:",
        error.response?.data || error.message
      );
      const message =
        error.response?.data?.message ||
        "Error updating profile. Please try again.";
      toast.error(message);
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, p: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Update Profile
      </Typography>
      <form onSubmit={handleSubmit}>
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              User Details
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  variant="outlined"
                  fullWidth
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Mobile Number"
                  variant="outlined"
                  fullWidth
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Phone />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ mt: 2, mr: 1 }}
        >
          Update
        </Button>
        <Button
          variant="outlined"
          onClick={handleBackClick}
          startIcon={<ArrowBack />}
          sx={{ mt: 2 }}
        >
          Back
        </Button>
      </form>
      <ToastContainer />
    </Container>
  );
};

export default Profile;

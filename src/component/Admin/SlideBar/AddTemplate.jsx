import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { API_BASE_URL } from "../../../config/apiConfig";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const AddTemplate = () => {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const templateData = {
      templateName: data.get("templateName"),
      htmlContent: data.get("htmlContent"),
    };

    console.log("template data", templateData);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/templates/add`,
        templateData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );
      toast.success("Template Added Successfully!");
      navigate("/admin/admin/adminDashboard/templateList");
    } catch (error) {
      console.error(
        "Error in adding template:",
        error.response?.data || error.message
      );
      const message =
        error.response?.data?.message ||
        "Error in adding template. Please try again.";
      toast.error(message);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
    >
      <Card sx={{ width: "100%", maxWidth: 500, p: 3, boxShadow: 3 }}>
        <CardContent>
          <Box display="flex" alignItems="center" mb={2}>
            <IconButton onClick={() => navigate(-1)} color="primary">
              <ArrowBackIcon />
            </IconButton>
            <Typography
              variant="h5"
              color="primary"
              fontWeight="bold"
              sx={{ flexGrow: 1, ml: 1 }}
            >
              Add New Template
            </Typography>
            <AddCircleOutlineIcon color="secondary" />
          </Box>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Template Name"
              name="templateName"
              placeholder="Enter Template Name"
              variant="outlined"
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="HTML Content"
              name="htmlContent"
              placeholder="Enter Template Content"
              variant="outlined"
              margin="normal"
              multiline
              rows={6}
              required
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              sx={{
                mt: 2,
                bgcolor: "#4CAF50",
                "&:hover": { bgcolor: "#388E3C" },
              }}
            >
              Save Template
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AddTemplate;

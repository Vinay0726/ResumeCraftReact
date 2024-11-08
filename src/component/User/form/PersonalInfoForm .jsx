import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setMobileNumber,
  setPersonalInfo,
} from "../../../Store/State/resumedetails/resumeAction";
import {
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Save as SaveIcon } from "@mui/icons-material";
import axios from "axios";

const PersonalInfoForm = () => {
  const dispatch = useDispatch();
  const personalInfo = useSelector((state) => state.resume.personalInfo);
  const mobileNumber = useSelector((state) => state.resume.mobileNumber);

  const [name, setName] = useState(personalInfo || "");
  const [mobile, setMobile] = useState(mobileNumber || "");
  const [role, setRole] = useState(""); // Field to input main role
  const [suggestedInfo, setSuggestedInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRoleChange = (e) => {
    setRole(e.target.value);
    if (e.target.value.trim()) {
      fetchRoleInfo(e.target.value.trim());
    } else {
      setSuggestedInfo("");
    }
  };

  const fetchRoleInfo = async (role) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyDpBWbq7fC1_IqCZSTsRC8fjQqijOD8LmA",
        {
          contents: [
            {
              parts: [
                {
                  text: `Provide a short, professional description for the role of ${role}.`,
                },
              ],
            },
          ],
        }
      );

      const description =
        response.data.candidates[0].content.parts[0].text.trim();
      setSuggestedInfo(description);
    } catch (error) {
      console.error("Error fetching role information:", error);
      setError("Failed to fetch role information. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSavePersonalInfo = () => {
    dispatch(setPersonalInfo(name || suggestedInfo)); // Save personal info or use suggestion
    dispatch(setMobileNumber(mobile)); // Save mobile number
  };

  return (
    <Box
      sx={{
        padding: 3,
        backgroundColor: "#f9f9f9",
        borderRadius: 1,
        boxShadow: 2,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Personal Information
      </Typography>

      <TextField
        variant="outlined"
        value={role}
        onChange={handleRoleChange}
        placeholder="Enter your main role (e.g., Software Engineer)"
        fullWidth
        sx={{ marginBottom: 2 }}
      />

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ marginBottom: 2 }}>
          {error}
        </Alert>
      )}

      {suggestedInfo && (
        <Alert severity="info" sx={{ marginBottom: 2 }}>
          Suggested Description: {suggestedInfo}
        </Alert>
      )}

      <TextField
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Edit or confirm the description"
        fullWidth
        multiline
        rows={4}
        sx={{ marginBottom: 2 }}
      />

      <TextField
        variant="outlined"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
        placeholder="Enter your Mobile number"
        type="number"
        fullWidth
        sx={{ marginBottom: 2 }}
      />

      <Button
        variant="outlined"
        color="primary"
        onClick={handleSavePersonalInfo}
        sx={{
          width: "100%",
          padding: "10px",
          borderColor: "#6200ea",
          color: "#6200ea",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          "&:hover": {
            borderColor: "#9c27b0",
            backgroundColor: "#d9fadc",
          },
        }}
      >
        <SaveIcon sx={{ mr: 1 }} />
        Save Personal Info
      </Button>
    </Box>
  );
};

export default PersonalInfoForm;

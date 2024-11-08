import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setWorkExperience } from "../../../Store/State/resumedetails/resumeAction";
import { TextField, Button, Typography, Box } from "@mui/material";
import { Save as SaveIcon } from "@mui/icons-material";

const WorkExperienceForm = () => {
  const dispatch = useDispatch();
  const workExperience = useSelector((state) => state.resume.workExperience);

  const [experience, setExperience] = useState(workExperience || "");

  const handleExperienceChange = (e) => {
    setExperience(e.target.value);
  };

  const handleSaveExperience = () => {
    dispatch(setWorkExperience(experience)); // Dispatch Redux action to save work experience
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
        Work Experience
      </Typography>

      <TextField
        variant="outlined"
        multiline
        rows={4}
        value={experience}
        onChange={handleExperienceChange}
        placeholder="Enter your work experience"
        fullWidth
        sx={{ marginBottom: 2 }}
      />

      <Button
        variant="outlined"
        color="primary"
        onClick={handleSaveExperience}
        sx={{
          width: "100%",
          padding: "10px",
          borderColor: "#6200ea", // Set border color
          color: "#6200ea", // Text color
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          "&:hover": {
            borderColor: "#9c27b0", // Change border on hover
            backgroundColor: "#d9fadc", // Light background on hover
          },
        }}
      >
        {" "}
        <SaveIcon sx={{ mr: 1 }} />
        Save Work Experience
      </Button>
    </Box>
  );
};

export default WorkExperienceForm;

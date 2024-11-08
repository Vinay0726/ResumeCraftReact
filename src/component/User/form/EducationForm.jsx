import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEducationDetails } from "../../../Store/State/resumedetails/resumeAction";
import { TextField, Button, Typography, Box } from "@mui/material";
import { Save as SaveIcon } from "@mui/icons-material";

const EducationForm = () => {
  const dispatch = useDispatch();
  const educationDetails = useSelector(
    (state) => state.resume.educationDetails
  );
  const [education, setEducation] = useState(educationDetails || "");

  const handleEducationChange = (e) => {
    setEducation(e.target.value);
  };

  const handleSaveEducation = () => {
    dispatch(setEducationDetails(education)); // Dispatch Redux action to save education details
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 2,
        backgroundColor: "#f9f9f9",
        borderRadius: 1,
        boxShadow: 2,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Education Details
      </Typography>
      <TextField
        multiline
        rows={4}
        value={education}
        onChange={handleEducationChange}
        placeholder="Enter your education details"
        variant="outlined"
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <Button
        variant="outlined"
        color="primary"
        onClick={handleSaveEducation}
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
        Save Education Details
      </Button>
    </Box>
  );
};

export default EducationForm;

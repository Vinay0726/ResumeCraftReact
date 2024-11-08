import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField, Button, Box, Typography } from "@mui/material";
import { setTemplateName } from "../../../Store/State/resumedetails/resumeAction";
import { Save as SaveIcon } from "@mui/icons-material"; // Material UI Save Icon

const TemplateForm = () => {
  const dispatch = useDispatch();
  const templateName = useSelector((state) => state.resume.templateName);

  const [template, setTemplate] = useState(templateName || "");

  const handleTemplateChange = (e) => {
    setTemplate(e.target.value);
  };

  const handleSaveTemplate = () => {
    dispatch(setTemplateName(template)); // Dispatch Redux action to save template name
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        mt: 5,
        p: 4,
        bgcolor: "#fff",
        borderRadius: 3,
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
        maxWidth: 400,
        mx: "auto",
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        sx={{ fontWeight: "bold", color: "#333" }}
      >
        Choose Resume Name
      </Typography>

      <TextField
        label="Resume Name"
        variant="outlined"
        value={template}
        onChange={handleTemplateChange}
        fullWidth
        sx={{
          mb: 3,
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#6200ea", // Customize border color
            },
            "&:hover fieldset": {
              borderColor: "#9c27b0", // Change on hover
            },
          },
        }}
      />

      <Button
        variant="outlined"
        color="primary"
        onClick={handleSaveTemplate}
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
        <SaveIcon sx={{ mr: 1 }} /> {/* Add save icon with right margin */}
        Save Template
      </Button>
    </Box>
  );
};

export default TemplateForm;

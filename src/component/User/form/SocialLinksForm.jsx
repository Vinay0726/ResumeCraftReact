import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setEmail,
  setGithubLink,
  setLinkedinLink,
  setTwitterLink,
} from "../../../Store/State/resumedetails/resumeAction"; // Separate actions for each field
import { TextField, Button, Typography, Box } from "@mui/material";
import { Save as SaveIcon } from "@mui/icons-material";
const SocialLinksForm = () => {
  const dispatch = useDispatch();
  const socialLinks = useSelector((state) => state.resume);

  const [email, setEmailState] = useState(socialLinks.email || "");
  const [github, setGithub] = useState(socialLinks.githubLink || "");
  const [linkedin, setLinkedin] = useState(socialLinks.linkedinLink || "");
  const [twitter, setTwitter] = useState(socialLinks.twitterLink || "");

  const handleSaveSocialLinks = () => {
    dispatch(setEmail(email)); // Dispatch each value separately
    dispatch(setGithubLink(github));
    dispatch(setLinkedinLink(linkedin));
    dispatch(setTwitterLink(twitter));
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
        Social Links
      </Typography>

      <TextField
        variant="outlined"
        type="email"
        value={email}
        onChange={(e) => setEmailState(e.target.value)}
        placeholder="Email"
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        variant="outlined"
        type="text"
        value={github}
        onChange={(e) => setGithub(e.target.value)}
        placeholder="GitHub"
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        variant="outlined"
        type="text"
        value={linkedin}
        onChange={(e) => setLinkedin(e.target.value)}
        placeholder="LinkedIn"
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        variant="outlined"
        type="text"
        value={twitter}
        onChange={(e) => setTwitter(e.target.value)}
        placeholder="Twitter"
        fullWidth
        sx={{ marginBottom: 2 }}
      />

      <Button
        variant="outlined"
        color="primary"
        onClick={handleSaveSocialLinks}
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
        Save Social Links
      </Button>
    </Box>
  );
};

export default SocialLinksForm;

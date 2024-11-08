import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Typography, Paper, Box, Button, Grid } from "@mui/material";
import axios from "axios";
import { API_BASE_URL } from "../../../config/apiConfig";

const TemplateDetails = () => {
  const { templateName } = useParams();
  const navigate = useNavigate();
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);
  const contentRef = useRef();

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/templates/${templateName}`
        );
        setTemplate(response.data);
      } catch (error) {
        console.error("Error fetching template:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplate();
  }, [templateName]);

  const injectDummyDataIntoTemplate = (templateContent) => {
    if (!templateContent) return "";

    let modifiedTemplate = templateContent
      .replace("${userProfile.firstName}", "John")
      .replace("${userProfile.lastName}", "Doe")
      .replace("${userProfile.email}", "johndoe@example.com")
      .replace("${userProfile.mobileNumber}", "123-456-7890")
      .replace("${lastResume.personalInfo}", "Frontend Developer")
      .replace(
        "${lastResume.educationDetails}",
        "Bachelor's Degree in Computer Applications (BCA)"
      )
      .replace("${lastResume.workExperience}", "Fresher")
      .replace(
        "${lastResume.githubLink}",
        "<a href='#'>https://github.com/johndoe</a>"
      )
      .replace(
        "${lastResume.linkedinLink}",
        "<a href='#'>https://linkedin.com/in/johndoe</a>"
      )
      .replace(
        "${lastResume.twitterLink}",
        "<a href='#'>https://twitter.com/johndoe</a>"
      );

    const skillsList = "<p>JavaScript</p><p>React</p><p>CSS</p>";
    const projectsList = `
      <p><strong>Portfolio Website</strong></p><p>Personal portfolio website showcasing projects and skills.</p>
      <p><strong>Todo App</strong></p><p>A simple todo app built with React.</p>
    `;

    modifiedTemplate = modifiedTemplate.replace("{{skillsList}}", skillsList);
    modifiedTemplate = modifiedTemplate.replace(
      "{{projectsList}}",
      projectsList
    );

    return modifiedTemplate;
  };

  if (loading) {
    return (
      <Typography variant="h6" color="textSecondary">
        Loading...
      </Typography>
    );
  }

  if (!template) {
    return (
      <Typography variant="h6" color="error">
        Error: Template not found.
      </Typography>
    );
  }

  const templateWithData = injectDummyDataIntoTemplate(template.htmlContent);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      padding={2}
      minHeight="100vh"
      bgcolor="#f9f9f9"
    >
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={10} md={8} lg={8}>
          <Paper
            className="p-6 shadow-lg"
            sx={{
              borderRadius: "8px",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
              padding: { xs: 2, sm: 3, md: 4 },
            }}
          >
            <Typography
              variant="h4"
              fontWeight="bold"
              className="mb-4 text-center mt-2"
            >
              {template.templateName}
            </Typography>
            <Box
              ref={contentRef}
              sx={{
                maxHeight: "70vh", // Set a fixed maximum height
                overflowY: "auto", // Make it scrollable
                padding: 2,
                borderRadius: "4px",
                backgroundColor: "#f3f3f3",
              }}
              className="template-content"
              dangerouslySetInnerHTML={{ __html: templateWithData }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate(-1)}
              className="mt-4"
              sx={{
                marginTop: 2,
                bgcolor: "#72db90",
                "&:hover": {
                  bgcolor: "#529e68",
                },
              }}
            >
              Back
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TemplateDetails;

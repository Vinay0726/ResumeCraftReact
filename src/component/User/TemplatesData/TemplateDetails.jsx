import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Typography, Paper, Box, Button, Grid } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import axios from "axios";
import { API_BASE_URL } from "../../../config/apiConfig";
import html2pdf from "html2pdf.js";

const TemplateDetails = () => {
  const { templateName } = useParams();
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const [resumes, setResumes] = useState([]);
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

  useEffect(() => {
    const fetchData = async () => {
      const jwt = localStorage.getItem("jwt");
      try {
        const response = await axios.get(
          "http://localhost:8080/api/user/userProfileWithResumes",
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
 
        if (
          response.data &&
          response.data.userProfile &&
          response.data.resumes
        ) {
          setUserProfile(response.data.userProfile);
          setResumes(response.data.resumes);
        } else {
          console.error("Unexpected response structure:", response.data);
        }
      } catch (error) {
        console.error("Error fetching user profile and resumes:", error);
      }
    };

    fetchData();
  }, []);

  const lastResume = resumes.length > 0 ? resumes[resumes.length - 1] : null;

  const injectUserProfileIntoTemplate = (
    templateContent,
    userProfile,
    lastResume
  ) => {
    if (!templateContent || !userProfile || !lastResume) return "";

    let modifiedTemplate = templateContent
      .replace("${userProfile.firstName}", userProfile.firstName || "")
      .replace("${userProfile.lastName}", userProfile.lastName || "")
      .replace("${userProfile.email}", userProfile.email || "")
      .replace("${userProfile.mobileNumber}", userProfile.mobileNumber || "")
      .replace(
        "${lastResume.personalInfo}",
        lastResume.personalInfo || "Frontend Developer"
      )
      .replace(
        "${lastResume.educationDetails}",
        lastResume.educationDetails ||
          "Bachelor's Degree in Computer Applications (BCA)"
      )
      .replace(
        "${lastResume.workExperience}",
        lastResume.workExperience || "Fresher"
      )
      .replace(
        "${lastResume.githubLink}",
        lastResume.githubLink
          ? `<a href='${lastResume.githubLink}' target='_blank'>${lastResume.githubLink}</a>`
          : "No GitHub link provided"
      )
      .replace(
        "${lastResume.linkedinLink}",
        lastResume.linkedinLink
          ? `<a href='${lastResume.linkedinLink}' target='_blank'>${lastResume.linkedinLink}</a>`
          : "No LinkedIn link provided"
      )
      .replace(
        "${lastResume.twitterLink}",
        lastResume.twitterLink
          ? `<a href='${lastResume.twitterLink}' target='_blank'>${lastResume.twitterLink}</a>`
          : "No Twitter link provided"
      );

    const skillsList =
      lastResume.skills && lastResume.skills.length > 0
        ? lastResume.skills.map((skill) => `<p>${skill}</p>`).join("")
        : "<li>No skills listed</li>";

    const projectsList =
      lastResume.projects && lastResume.projects.length > 0
        ? lastResume.projects
            .map(
              (project) => ` 
            <p ><strong>${project.projectName}</strong></p><p> ${
                project.projectDescription || "No description provided"
              }
           </p>
          `
            )
            .join("")
        : "<li>No projects listed</li>";

    modifiedTemplate = modifiedTemplate.replace("{{skillsList}}", skillsList);
    modifiedTemplate = modifiedTemplate.replace(
      "{{projectsList}}",
      projectsList
    );

    return modifiedTemplate;
  };

  const downloadResume = () => {
    const element = contentRef.current;
    const options = {
      margin: 0.5,
      filename: `${template.templateName}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().from(element).set(options).save();
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

  const templateWithData = injectUserProfileIntoTemplate(
    template.htmlContent,
    userProfile,
    lastResume
  );

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
        <Grid item xs={12} sm={10} md={8} lg={6}>
          <Paper
            className="p-6 shadow-lg"
            sx={{
              borderRadius: "8px",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
              overflowY: "auto",
              padding: { xs: 2, sm: 3, md: 4 }, // Responsive padding
            }}
          >
            <Box>
              <Typography
                variant="h4"
                fontWeight="bold"
                className="mb-4 text-center mt-2"
              >
                {template.templateName}
              </Typography>
              <div
                ref={contentRef}
                className="template-content"
                dangerouslySetInnerHTML={{ __html: templateWithData }}
              />
            </Box>
            <Button
              variant="contained"
              color="primary"
              onClick={downloadResume}
              className="mt-4"
              startIcon={<DownloadIcon />}
              sx={{
                marginTop: 1,
                bgcolor: "#72db90",
                "&:hover": {
                  bgcolor: "#529e68",
                },
              }}
            >
              Download Resume
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TemplateDetails;

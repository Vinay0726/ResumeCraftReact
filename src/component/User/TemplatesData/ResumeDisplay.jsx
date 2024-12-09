import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import axios from "axios";

const ResumeDisplay = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [resumes, setResumes] = useState([]);

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
    
        console.log("API response:", response.data);

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

  // Extract the last resume
  const lastResume = resumes.length > 0 ? resumes[resumes.length - 1] : null;

  return (
    <div className="p-4">
      <Typography variant="h4" className="mb-4">
        User Profile
      </Typography>
      {userProfile ? (
        <Card className="mb-4">
          <CardContent>
            <Typography variant="h5">{`${userProfile.firstName} ${userProfile.lastName}`}</Typography>
            <Typography color="textSecondary">{userProfile.email}</Typography>
            <Typography color="textSecondary">
              {userProfile.mobileNumber}
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Typography>No user profile found.</Typography>
      )}

      <Typography variant="h4" className="mb-4">
        Last Resume
      </Typography>

      {lastResume ? (
        <Grid item xs={12} sm={6} md={4}>
          <Card className="mb-4">
            <CardContent>
              <Typography variant="h5">{lastResume.templateName}</Typography>
              <Typography>{lastResume.personalInfo}</Typography>
              <Typography variant="body2" color="textSecondary">
                Education: {lastResume.educationDetails}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Experience: {lastResume.workExperience}
              </Typography>
              <Typography variant="h6" className="mt-2">
                Skills:
              </Typography>
              <ul className="list-disc list-inside">
                {lastResume.skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
              <Typography variant="h6" className="mt-2">
                Links:
              </Typography>
              <Typography>
                GitHub:{" "}
                <a
                  href={lastResume.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {lastResume.githubLink}
                </a>
              </Typography>
              <Typography>
                LinkedIn:{" "}
                <a
                  href={lastResume.linkedinLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {lastResume.linkedinLink}
                </a>
              </Typography>
              <Typography>
                Twitter:{" "}
                <a
                  href={lastResume.twitterLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {lastResume.twitterLink}
                </a>
              </Typography>
              <Typography variant="h6" className="mt-2">
                Projects:
              </Typography>
              <ul className="list-disc list-inside">
                {lastResume.projects.map((project) => (
                  <li key={project.id}>
                    <strong>{project.projectName}</strong>:{" "}
                    {project.projectDescription || "No description available"}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </Grid>
      ) : (
        <Typography>No resumes found.</Typography>
      )}
    </div>
  );
};

export default ResumeDisplay;

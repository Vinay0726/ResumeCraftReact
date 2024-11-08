import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSkills,
  setProjects,
} from "../../../Store/State/resumedetails/resumeAction";
import {
  TextField,
  Button,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Grid,
  Paper,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Save as SaveIcon, Add as AddIcon } from "@mui/icons-material";
import axios from "axios";

const MySkillsForm = () => {
  const dispatch = useDispatch();
  const skills = useSelector((state) => state.resume.skills);
  const projects = useSelector((state) => state.resume.projects);

  const [skillInput, setSkillInput] = useState("");
  const [skillList, setSkillList] = useState(skills || []);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectList, setProjectList] = useState(projects || []);
  const [suggestedDescriptions, setSuggestedDescriptions] = useState([]);
  const [loadingDescriptions, setLoadingDescriptions] = useState(false);
  const [error, setError] = useState(null);

  const handleSkillChange = (e) => {
    setSkillInput(e.target.value);
  };

  const handleAddSkill = () => {
    if (skillInput.trim() === "") return;
    setSkillList([...skillList, skillInput.trim()]);
    setSkillInput("");
  };

  console.log("skills list",skillList)
  const handleSaveSkills = () => {
    dispatch(setSkills(skillList));
  };

  // Fetch descriptions from Gemini API based on project name
  const fetchProjectDescriptions = async (name) => {
    setLoadingDescriptions(true);
    setError(null);
    try {
      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyDpBWbq7fC1_IqCZSTsRC8fjQqijOD8LmA",
        {
          contents: [
            {
              parts: [
                {
                  text: `Provide 3 unique and professional descriptions for a project named for my resume and it should be in 2 line only: ${name}`,
                },
              ],
            },
          ],
        }
      );

      // Debug: Log the entire response
      console.log("API Response:", response.data);

      // Extract descriptions correctly by mapping over all candidates
      const descriptions = response.data.candidates.map((candidate) =>
        candidate.content.parts[0].text.trim()
      );

      setSuggestedDescriptions(descriptions);
      
    } catch (error) {
      console.error("Error fetching descriptions:", error);
      setError("Failed to fetch project descriptions. Please try again.");
    } finally {
      setLoadingDescriptions(false);
    }
  };

  const handleProjectNameChange = (e) => {
    setProjectName(e.target.value);
    if (e.target.value.trim()) {
      fetchProjectDescriptions(e.target.value.trim());
    } else {
      setSuggestedDescriptions([]);
    }
  };

  const handleDescriptionChange = (index, value) => {
    const updatedDescriptions = [...suggestedDescriptions];
    updatedDescriptions[index] = value;
    setSuggestedDescriptions(updatedDescriptions);
  };

  const handleAddProject = () => {
    // Use the first suggested description if available and not empty
    const descriptionToUse =
      projectDescription.trim() !== ""
        ? projectDescription
        : suggestedDescriptions[0] || "";

    if (projectName.trim() === "" || descriptionToUse === "") return;

    const newProject = {
      projectName: projectName.trim(),
      projectDescription: descriptionToUse,
    };

    setProjectList([...projectList, newProject]);
    setProjectName("");
    setProjectDescription("");
    setSuggestedDescriptions([]);
  };

  const handleSaveProjects = () => {
    dispatch(setProjects(projectList));
  };

  return (
    <Box
      sx={{
        padding: 2,
        backgroundColor: "#f9f9f9",
        borderRadius: 1,
        boxShadow: 2,
        width: "100%",
        maxWidth: 1200,
        margin: "0 auto",
      }}
    >
      <Grid container spacing={4}>
        {/* Skills Section */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 3, borderRadius: 1, boxShadow: 2 }}>
            <Typography variant="h6" gutterBottom>
              My Skills
            </Typography>
            <TextField
              variant="outlined"
              value={skillInput}
              onChange={handleSkillChange}
              placeholder="Enter a skill"
              fullWidth
              sx={{ marginBottom: 2 }}
            />
            <Button
              variant="outlined"
              color="primary"
              onClick={handleAddSkill}
              fullWidth
              sx={{ marginBottom: 2 }}
              startIcon={<AddIcon />}
            >
              Add Skill
            </Button>

            <List>
              {skillList.map((skill, index) => (
                <ListItem key={index}>
                  <ListItemText primary={skill} />
                </ListItem>
              ))}
            </List>

            <Button
              variant="outlined"
              color="secondary"
              onClick={handleSaveSkills}
              fullWidth
              sx={{ marginTop: 2 }}
              startIcon={<SaveIcon />}
            >
              Save Skills
            </Button>
          </Paper>
        </Grid>

        {/* Projects Section */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 3, borderRadius: 1, boxShadow: 2 }}>
            <Typography variant="h6" gutterBottom>
              My Projects
            </Typography>

            <TextField
              variant="outlined"
              value={projectName}
              onChange={handleProjectNameChange}
              placeholder="Project Name"
              fullWidth
              sx={{ marginBottom: 2 }}
            />

            {loadingDescriptions && (
              <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
                <CircularProgress />
              </Box>
            )}

            {error && (
              <Alert severity="error" sx={{ marginBottom: 2 }}>
                {error}
              </Alert>
            )}

            {suggestedDescriptions.length > 0 && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Suggested Descriptions
                </Typography>
                {suggestedDescriptions.map((desc, index) => (
                  <TextField
                    key={index}
                    variant="outlined"
                    value={desc}
                    onChange={(e) =>
                      handleDescriptionChange(index, e.target.value)
                    }
                    placeholder={`Suggested Description ${index + 1}`}
                    fullWidth
                    multiline
                    rows={8}
                    sx={{ marginBottom: 2 }}
                  />
                ))}
              </Box>
            )}

            <TextField
              variant="outlined"
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              placeholder="Or enter a custom project description"
              fullWidth
              multiline
              rows={4}
              sx={{ marginBottom: 2 }}
            />

            <Button
              variant="outlined"
              color="primary"
              onClick={handleAddProject}
              fullWidth
              sx={{ marginBottom: 2 }}
              startIcon={<AddIcon />}
            >
              Add Project
            </Button>

            <List>
              {projectList.map((project, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={project.projectName}
                    secondary={project.projectDescription}
                  />
                </ListItem>
              ))}
            </List>

            <Button
              variant="outlined"
              color="secondary"
              onClick={handleSaveProjects}
              fullWidth
              sx={{ marginTop: 2 }}
              startIcon={<SaveIcon />}
            >
              Save Projects
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MySkillsForm;

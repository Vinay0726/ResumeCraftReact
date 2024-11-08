import axios from "axios";
import {
  SET_PERSONAL_INFO,
  SET_EDUCATION_DETAILS,
  SET_WORK_EXPERIENCE,
  SET_SKILLS,
  SET_TEMPLATE_NAME,
  SET_RESUME_DETAILS,
  SET_EMAIL,
  SET_GITHUB_LINK,
  SET_LINKEDIN_LINK,
  SET_TWITTER_LINK,
  SET_MOBILE_NUMBER,
  SET_PROJECTS,
} from "./resumeActionType";
import { API_BASE_URL } from "../../../config/apiConfig";

// Action to set personal info
export const setPersonalInfo = (personalInfo) => ({
  type: SET_PERSONAL_INFO,
  payload: personalInfo,
});

export const setMobileNumber = (mobileNumber) => ({
  type: SET_MOBILE_NUMBER,
  payload: mobileNumber,
});

// Action to set education details
export const setEducationDetails = (educationDetails) => ({
  type: SET_EDUCATION_DETAILS,
  payload: educationDetails,
});

// Action to set work experience
export const setWorkExperience = (workExperience) => ({
  type: SET_WORK_EXPERIENCE,
  payload: workExperience,
});

// Action to set skills
export const setSkills = (skills) => ({
  type: SET_SKILLS,
  payload: skills,
});

export const setEmail = (email) => ({
  type: SET_EMAIL,
  payload: email,
});

export const setGithubLink = (githubLink) => ({
  type: SET_GITHUB_LINK,
  payload: githubLink,
});

export const setLinkedinLink = (linkedinLink) => ({
  type: SET_LINKEDIN_LINK,
  payload: linkedinLink,
});

export const setTwitterLink = (twitterLink) => ({
  type: SET_TWITTER_LINK,
  payload: twitterLink,
});
export const setProjects = (projects) => ({
  type: SET_PROJECTS,
  payload: projects,
});
// Action to set template name
export const setTemplateName = (templateName) => ({
  type: SET_TEMPLATE_NAME,
  payload: templateName,
});

// Action to set entire resume details (API call to the backend)
export const setResumeDetails = (resume) => {
  return async (dispatch) => {
    try {

      // Log the input resume data before making the API call
      console.log("Resume input data:", resume);

      const jwt = localStorage.getItem("jwt"); // Get JWT from local storage
      const config = {
        headers: {
          Authorization: `Bearer ${jwt}`, // Pass JWT in Authorization header
        },
      };

      // API call to create resume
      const response = await axios.post(
        `${API_BASE_URL}/api/user/resume`,
        resume,
        config
      );

      // Log the response data to check what is returned from the backend
      console.log("Response from backend:", response.data);

      // Dispatch action when the API call is successful
      dispatch({
        type: SET_RESUME_DETAILS,
        payload: response.data, // Response from the backend (created resume)
      });

      // Optionally show success message
      alert("Resume created successfully!");
    } catch (error) {
      // Log the error details for debugging
      console.error("Error creating resume:", error.response?.data);
      alert("Failed to create resume.");
    }
  };
};

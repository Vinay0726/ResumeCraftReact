import {
  SET_PERSONAL_INFO,
  SET_EDUCATION_DETAILS,
  SET_WORK_EXPERIENCE,
  SET_SKILLS,
  SET_EMAIL,
  SET_GITHUB_LINK,
  SET_LINKEDIN_LINK,
  SET_TWITTER_LINK,
  SET_TEMPLATE_NAME,
  SET_RESUME_DETAILS,
  SET_MOBILE_NUMBER,
  SET_PROJECTS,
} from "./resumeActionType";

// Initial state for the resume builder
const initialState = {
  personalInfo: "",
  mobileNumber: "",
  educationDetails: "",
  workExperience: "",
  skills: [],
  email: "", // Separate field for email
  githubLink: "", // Separate field for GitHub link
  linkedinLink: "", // Separate field for LinkedIn link
  twitterLink: "", // Separate field for Twitter link
  templateName: "",
  projects: [],
  resume: null, // Final resume data after submission
};

// Reducer function to handle actions
const resumeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PERSONAL_INFO:
      return {
        ...state,
        personalInfo: action.payload,
      };
    case SET_MOBILE_NUMBER:
      return {
        ...state,
        mobileNumber: action.payload,
      };

    case SET_EDUCATION_DETAILS:
      return {
        ...state,
        educationDetails: action.payload,
      };

    case SET_WORK_EXPERIENCE:
      return {
        ...state,
        workExperience: action.payload,
      };

    case SET_SKILLS:
      return {
        ...state,
        skills: action.payload,
      };
    case SET_PROJECTS:
      return {
        ...state,
        projects: action.payload,
      };
    case SET_EMAIL:
      return {
        ...state,
        email: action.payload,
      };

    case SET_GITHUB_LINK:
      return {
        ...state,
        githubLink: action.payload,
      };

    case SET_LINKEDIN_LINK:
      return {
        ...state,
        linkedinLink: action.payload,
      };

    case SET_TWITTER_LINK:
      return {
        ...state,
        twitterLink: action.payload,
      };

    case SET_TEMPLATE_NAME:
      return {
        ...state,
        templateName: action.payload,
      };

    case SET_RESUME_DETAILS:
      return {
        ...state,
        resume: action.payload, // Store the final resume data from the backend
      };

    default:
      return state;
  }
};

export default resumeReducer;

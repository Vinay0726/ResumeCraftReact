// src/redux/actions/profileActions.js

import axios from "axios"; // Import Axios
import { API_BASE_URL } from "../../../config/apiConfig";
import {
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILURE,
} from "./profileActionType";

export const updateProfile = (profileData) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_PROFILE_REQUEST });

    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/user/update`,
        {
          userProfile: profileData,
          resumes: [], // Adjust resumes accordingly
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming you store the token in local storage
          },
        }
      );

      dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: response.data });
      // Optionally, show success message or redirect user
    } catch (error) {
      // Handle errors properly to get the error message
      const errorMessage = error.response?.data?.message || error.message;
      dispatch({ type: UPDATE_PROFILE_FAILURE, payload: errorMessage });
      // Optionally, show error message
    }
  };
};

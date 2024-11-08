import axios from "axios";
import { GET_PROFILE_REQUEST,GET_PROFILE_SUCCESS,GET_PROFILE_FAILURE, } from "./userActionType";
import { API_BASE_URL } from "../../../config/apiConfig";



// Action to initiate profile fetch request
export const getProfileRequest = () => {
  return {
    type: GET_PROFILE_REQUEST,
  };
};

// Action for successful profile fetch
export const getProfileSuccess = (user) => {
  return {
    type: GET_PROFILE_SUCCESS,
    payload: user, // The user profile data
  };
};

// Action for failed profile fetch
export const getProfileFailure = (error) => {
  return {
    type: GET_PROFILE_FAILURE,
    payload: error, // The error message
  };
};

// Thunk action to fetch user profile
export const fetchUserProfile = (jwt) => {
  return async (dispatch) => {
    dispatch(getProfileRequest()); // Dispatch request action
    try {
      const response = await axios.get(`${API_BASE_URL}/api/user/profile`, {
        headers: {
          Authorization: jwt, // Include the JWT in the request headers
        },
      });
      const user = response.data;
      console.log("userProfile data", user); // Extract user data
      dispatch(getProfileSuccess(user)); // Dispatch success action
    } catch (error) {
      dispatch(getProfileFailure(error.message)); // Dispatch failure action
    }
  };
};

// Ensure
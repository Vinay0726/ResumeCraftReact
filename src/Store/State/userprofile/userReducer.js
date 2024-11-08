import {
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE,
} from "./userActionType";


const initialState = {
  loading: false, // To manage loading state
  userProfile: null, // To store user profile information
  error: null, // To store any error message
};

// User reducer function
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE_REQUEST:
      return {
        ...state,
        loading: true, // Set loading to true when the request starts
      };
    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false, // Set loading to false when the request is complete
        userProfile: action.payload, // Store the user profile data
        error: null, // Clear error message
      };
    case GET_PROFILE_FAILURE:
      return {
        ...state,
        loading: false, // Set loading to false if the request fails
        userProfile: null, // Clear user profile data
        error: action.payload, // Store the error message
      };
    default:
      return state; // Return the current state for unknown actions
  }
};

export default userReducer;

// src/redux/reducers/profileReducer.js

import {
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILURE,
} from "./profileActionType";



const initialState = {
  userProfile: null,
  loading: false,
  error: null,
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_REQUEST:
      return { ...state, loading: true, error: null };
    case UPDATE_PROFILE_SUCCESS:
      return { ...state, loading: false, userProfile: action.payload };
    case UPDATE_PROFILE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default profileReducer;

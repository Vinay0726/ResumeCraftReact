import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk"; // Import named export
import { authReducer } from "./State/Auth/Reducer";
import resumeReducer from "./State/resumedetails/resumeReducer";
import userReducer from "./State/userprofile/userReducer";


const rootReducers = combineReducers({
  auth: authReducer,
  resume: resumeReducer,
  user: userReducer,
});

export const store = legacy_createStore(rootReducers, applyMiddleware(thunk));

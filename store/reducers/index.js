import { combineReducers } from "redux";

import faceImagesListReducer from "./faceImagesListReducer";
import eventReducer from "./eventReducer"

export default combineReducers({
    faceImagesListReducer:faceImagesListReducer,
    eventReducer:eventReducer
});
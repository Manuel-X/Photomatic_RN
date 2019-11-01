import * as actionTypes from "../actions/types";

const initialState = {
    faceImagesList: [],   
    loading: true,
  };


const faceImagesListReducer = (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.SEND_FACE_GET_IMAGES:
        return {
          ...state,
          faceImagesList: action.payload,
          loading: false,
        };
      case actionTypes.FACEDETECTING_LOADING:
        return {
          ...state,
          loading: true
       };
        default:
            return state;
        }
      };


export default faceImagesListReducer;
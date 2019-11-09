
import axios from "axios";
import * as actionTypes from "./types";


export const getFaceImagesList = (faceImgBase64, eventID) => {
    console.log("Sent image and waiting for list!!!!")
    return async dispatch => {
      dispatch(setFaceDetectingLoading());
      try {
        const res = await axios.post(`http://48a724e4.ngrok.io/api/faceImagesList/${eventID}`, faceImgBase64);
        const faceImagesList = res.data;
        console.log("FACE IMAGES LIST!!!!!!!!!:",faceImagesList)
        dispatch({
          type: actionTypes.SEND_FACE_GET_IMAGES,
          payload: faceImagesList
        });
      } catch (err) {
        console.error("Error while getting face images list", err);
      }
    };
  };

  export const selectAllImages = () => ({
    type: actionTypes.SELECTALL_IMAGES,
  
  });

  export const deSelectAllImages = () => ({
    type: actionTypes.DESELECTALL_IMAGES,
  
  });

  export const selectImage = (index) => {
    return{
    type: actionTypes.SELECT_IMAGE,
    index:index
    }
  };

  export const selectImageDeck = (index) => {
    return{
    type: actionTypes.SELECT_IMAGE_DECK,
    index:index
    }
  };

  export const deselectImage = (index) => ({
    type: actionTypes.DESELECT_IMAGE,
    index:index
  });

  
  export const deselectImageDeck = (index) => ({
    type: actionTypes.DESELECT_IMAGE_DECK,
    index:index
  });


  export const setFaceDetectingLoading = () => ({
    type: actionTypes.FACEDETECTING_LOADING
  });
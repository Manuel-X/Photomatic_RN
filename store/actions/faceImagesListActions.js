
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

  export const setFaceDetectingLoading = () => ({
    type: actionTypes.FACEDETECTING_LOADING
  });
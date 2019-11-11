
import axios from "axios";
import * as actionTypes from "./types";


export const getFaceImagesList = (event_id,faceImgBase64) => {
    console.log("Sent image and waiting for list!!!!")
    return async dispatch => {
      dispatch(setFaceDetectingLoading());
      try {
        const res = await axios.post(`http://3ed03a4c.ngrok.io/api/user/${event_id}/`, {base64:faceImgBase64});
        const faceImagesList = res.data;
        const pictures = faceImagesList.map((img, index) => {
          return(
          {link:`http://3ed03a4c.ngrok.io/media/${img.fields.photo}`, selected:false, title:`${index}`, id:`${index}`}
          )
        })
        console.log("LIST!!!!!!!!!!!!!",pictures)
        dispatch({
          type: actionTypes.SEND_FACE_GET_IMAGES,
          payload: pictures
        });
      } catch (err) {
        console.error("Error while getting face images list", err);
      }
    };
  };

  export const resetValues = () => ({
    type: actionTypes.RESET_VALUES,
  
  });

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
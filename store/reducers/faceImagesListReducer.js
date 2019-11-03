import * as actionTypes from "../actions/types";

const initialState = {
    faceImagesList: [{image:"https://netstorage-legit.akamaized.net/images/vllkyt4avcu5o8j6v.jpg",selected:false},{image:"https://i2-prod.mirror.co.uk/incoming/article10718834.ece/ALTERNATES/s1200b/Argentine-football-star-Lionel-Messi-and.jpg", selected:false}, {image:"https://images2.minutemediacdn.com/image/upload/c_fill,w_912,h_516,f_auto,q_auto,g_auto/shape/cover/sport/595a09852ad9e54e48000001.jpg",selected:false}, {image:"https://i2-prod.irishmirror.ie/incoming/article10718951.ece/ALTERNATES/s615b/Lionel-Messi-and-Antonela-Rocuzzos-Wedding.jpg",selected:false}, {image:"https://i.pinimg.com/originals/ec/41/b4/ec41b4cef7099c1c1faf812f25f6a9df.jpg", selected:false}, {image:"https://i.dailymail.co.uk/i/pix/2017/07/02/11/41F612A100000578-4658578-image-m-10_1498989696960.jpg",selected:false} ],   
    loading: false, //true
    selectedImages: [],
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
      case actionTypes.SELECTALL_IMAGES:
        newList = state.faceImagesList.map(faceImage => {
          return {
          ...faceImage,selected:true
          }
        })
        selectedList = state.faceImagesList.map(faceImage =>faceImage.image)

        return {
          ...state,
          faceImagesList: newList,
          selectedImages: [...selectedList]
       };


       case actionTypes.DESELECTALL_IMAGES:
          newList = state.faceImagesList.map(faceImage => {
            return {
            ...faceImage,selected:false
            }
          })
          return {
            ...state,
            faceImagesList: newList,
            selectedImages: [],
         };

       case actionTypes.SELECT_IMAGE:
         state.faceImagesList[action.index].selected=true
         newList=state.faceImagesList
         filteredList=newList.filter(image=>image.selected)
         selectedList = filteredList.map(faceImage =>faceImage.image)
         console.log("NEW LIST!!!!!!!!!!!!!",newList)
         console.log("SELECTED LIST!!!!!!!!!!!!!",selectedList)
          return {
            ...state,
            faceImagesList: [...newList],
            selectedImages: [...selectedList]
         };

      
       case actionTypes.DESELECT_IMAGE:
          state.faceImagesList[action.index].selected=false
          newList=state.faceImagesList
          filteredList=newList.filter(image=>image.selected)
          selectedList = filteredList.map(faceImage =>faceImage.image)
          console.log(newList)
          return {
            ...state,
            faceImagesList: [...newList],
            selectedImages: [...selectedList]
         };
        default:
            return state;
        }
      };


export default faceImagesListReducer;
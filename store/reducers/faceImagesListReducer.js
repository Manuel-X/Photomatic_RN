import * as actionTypes from "../actions/types";

const initialState = {
   // faceImagesList: [{id:1,link:"https://netstorage-legit.akamaized.net/images/vllkyt4avcu5o8j6v.jpg",selected:false, title:"1"},{id:2,link:"https://i2-prod.mirror.co.uk/incoming/article10718834.ece/ALTERNATES/s1200b/Argentine-football-star-Lionel-Messi-and.jpg", selected:false, title:"2"}, {id:3,link:"https://images2.minutemediacdn.com/image/upload/c_fill,w_912,h_516,f_auto,q_auto,g_auto/shape/cover/sport/595a09852ad9e54e48000001.jpg",selected:false, title:"3"}, {link:"https://i2-prod.irishmirror.ie/incoming/article10718951.ece/ALTERNATES/s615b/Lionel-Messi-and-Antonela-Rocuzzos-Wedding.jpg",selected:false, title:"4", id:4}, {link:"https://i.pinimg.com/originals/ec/41/b4/ec41b4cef7099c1c1faf812f25f6a9df.jpg", selected:false, title:"5", id:5}, {link:"https://i.dailymail.co.uk/i/pix/2017/07/02/11/41F612A100000578-4658578-image-m-10_1498989696960.jpg",selected:false, title:"6", id:6}, {id:7,link:"https://netstorage-legit.akamaized.net/images/vllkyt4avcu5o8j6v.jpg",selected:false, title:"1"},{id:8,link:"https://i2-prod.mirror.co.uk/incoming/article10718834.ece/ALTERNATES/s1200b/Argentine-football-star-Lionel-Messi-and.jpg", selected:false, title:"2"}, {id:9,link:"https://images2.minutemediacdn.com/image/upload/c_fill,w_912,h_516,f_auto,q_auto,g_auto/shape/cover/sport/595a09852ad9e54e48000001.jpg",selected:false, title:"3"}, {link:"https://i2-prod.irishmirror.ie/incoming/article10718951.ece/ALTERNATES/s615b/Lionel-Messi-and-Antonela-Rocuzzos-Wedding.jpg",selected:false, title:"4", id:10}, {link:"https://i.pinimg.com/originals/ec/41/b4/ec41b4cef7099c1c1faf812f25f6a9df.jpg", selected:false, title:"5", id:11}, {link:"https://i.dailymail.co.uk/i/pix/2017/07/02/11/41F612A100000578-4658578-image-m-10_1498989696960.jpg",selected:false, title:"6", id:12}, {id:13,link:"https://netstorage-legit.akamaized.net/images/vllkyt4avcu5o8j6v.jpg",selected:false, title:"1"},{id:14,link:"https://i2-prod.mirror.co.uk/incoming/article10718834.ece/ALTERNATES/s1200b/Argentine-football-star-Lionel-Messi-and.jpg", selected:false, title:"2"}, {id:15,link:"https://images2.minutemediacdn.com/image/upload/c_fill,w_912,h_516,f_auto,q_auto,g_auto/shape/cover/sport/595a09852ad9e54e48000001.jpg",selected:false, title:"3"}, {link:"https://i2-prod.irishmirror.ie/incoming/article10718951.ece/ALTERNATES/s615b/Lionel-Messi-and-Antonela-Rocuzzos-Wedding.jpg",selected:false, title:"4", id:16}, {link:"https://i.pinimg.com/originals/ec/41/b4/ec41b4cef7099c1c1faf812f25f6a9df.jpg", selected:false, title:"5", id:17}, {link:"https://i.dailymail.co.uk/i/pix/2017/07/02/11/41F612A100000578-4658578-image-m-10_1498989696960.jpg",selected:false, title:"6", id:18}, {id:19,link:"https://netstorage-legit.akamaized.net/images/vllkyt4avcu5o8j6v.jpg",selected:false, title:"1"},{id:20,link:"https://i2-prod.mirror.co.uk/incoming/article10718834.ece/ALTERNATES/s1200b/Argentine-football-star-Lionel-Messi-and.jpg", selected:false, title:"2"}, {id:21,link:"https://images2.minutemediacdn.com/image/upload/c_fill,w_912,h_516,f_auto,q_auto,g_auto/shape/cover/sport/595a09852ad9e54e48000001.jpg",selected:false, title:"3"}, {link:"https://i2-prod.irishmirror.ie/incoming/article10718951.ece/ALTERNATES/s615b/Lionel-Messi-and-Antonela-Rocuzzos-Wedding.jpg",selected:false, title:"4", id:22}, {link:"https://i.pinimg.com/originals/ec/41/b4/ec41b4cef7099c1c1faf812f25f6a9df.jpg", selected:false, title:"5", id:23}, {link:"https://i.dailymail.co.uk/i/pix/2017/07/02/11/41F612A100000578-4658578-image-m-10_1498989696960.jpg",selected:false, title:"6", id:24}, {id:25,link:"https://netstorage-legit.akamaized.net/images/vllkyt4avcu5o8j6v.jpg",selected:false, title:"1"},{id:26,link:"https://i2-prod.mirror.co.uk/incoming/article10718834.ece/ALTERNATES/s1200b/Argentine-football-star-Lionel-Messi-and.jpg", selected:false, title:"2"}, {id:27,link:"https://images2.minutemediacdn.com/image/upload/c_fill,w_912,h_516,f_auto,q_auto,g_auto/shape/cover/sport/595a09852ad9e54e48000001.jpg",selected:false, title:"3"}, {link:"https://i2-prod.irishmirror.ie/incoming/article10718951.ece/ALTERNATES/s615b/Lionel-Messi-and-Antonela-Rocuzzos-Wedding.jpg",selected:false, title:"4", id:28}, {link:"https://i.pinimg.com/originals/ec/41/b4/ec41b4cef7099c1c1faf812f25f6a9df.jpg", selected:false, title:"5", id:29}, {link:"https://i.dailymail.co.uk/i/pix/2017/07/02/11/41F612A100000578-4658578-image-m-10_1498989696960.jpg",selected:false, title:"6", id:30}, {id:31,link:"https://netstorage-legit.akamaized.net/images/vllkyt4avcu5o8j6v.jpg",selected:false, title:"1"},{id:32,link:"https://i2-prod.mirror.co.uk/incoming/article10718834.ece/ALTERNATES/s1200b/Argentine-football-star-Lionel-Messi-and.jpg", selected:false, title:"2"}, {id:33,link:"https://images2.minutemediacdn.com/image/upload/c_fill,w_912,h_516,f_auto,q_auto,g_auto/shape/cover/sport/595a09852ad9e54e48000001.jpg",selected:false, title:"3"}, {link:"https://i2-prod.irishmirror.ie/incoming/article10718951.ece/ALTERNATES/s615b/Lionel-Messi-and-Antonela-Rocuzzos-Wedding.jpg",selected:false, title:"4", id:34}, {link:"https://i.pinimg.com/originals/ec/41/b4/ec41b4cef7099c1c1faf812f25f6a9df.jpg", selected:false, title:"5", id:35}, {link:"https://i.dailymail.co.uk/i/pix/2017/07/02/11/41F612A100000578-4658578-image-m-10_1498989696960.jpg",selected:false, title:"6", id:36}, {id:37,link:"https://netstorage-legit.akamaized.net/images/vllkyt4avcu5o8j6v.jpg",selected:false, title:"1"},{id:38,link:"https://i2-prod.mirror.co.uk/incoming/article10718834.ece/ALTERNATES/s1200b/Argentine-football-star-Lionel-Messi-and.jpg", selected:false, title:"2"}, {id:39,link:"https://images2.minutemediacdn.com/image/upload/c_fill,w_912,h_516,f_auto,q_auto,g_auto/shape/cover/sport/595a09852ad9e54e48000001.jpg",selected:false, title:"3"}, {link:"https://i2-prod.irishmirror.ie/incoming/article10718951.ece/ALTERNATES/s615b/Lionel-Messi-and-Antonela-Rocuzzos-Wedding.jpg",selected:false, title:"4", id:40}, {link:"https://i.pinimg.com/originals/ec/41/b4/ec41b4cef7099c1c1faf812f25f6a9df.jpg", selected:false, title:"5", id:41}, {link:"https://i.dailymail.co.uk/i/pix/2017/07/02/11/41F612A100000578-4658578-image-m-10_1498989696960.jpg",selected:false, title:"6", id:42} ],   
   faceImagesList: [{id:1,link:"https://netstorage-legit.akamaized.net/images/vllkyt4avcu5o8j6v.jpg",selected:false, title:"1"},{id:2,link:"https://i2-prod.mirror.co.uk/incoming/article10718834.ece/ALTERNATES/s1200b/Argentine-football-star-Lionel-Messi-and.jpg", selected:false, title:"2"}, {id:3,link:"https://images2.minutemediacdn.com/image/upload/c_fill,w_912,h_516,f_auto,q_auto,g_auto/shape/cover/sport/595a09852ad9e54e48000001.jpg",selected:false, title:"3"}, {link:"https://i2-prod.irishmirror.ie/incoming/article10718951.ece/ALTERNATES/s615b/Lionel-Messi-and-Antonela-Rocuzzos-Wedding.jpg",selected:false, title:"4", id:4}, {link:"https://i.pinimg.com/originals/ec/41/b4/ec41b4cef7099c1c1faf812f25f6a9df.jpg", selected:false, title:"5", id:5}, {link:"https://i.dailymail.co.uk/i/pix/2017/07/02/11/41F612A100000578-4658578-image-m-10_1498989696960.jpg",selected:false, title:"6", id:6}, {id:7,link:"https://netstorage-legit.akamaized.net/images/vllkyt4avcu5o8j6v.jpg",selected:false, title:"1"},{id:8,link:"https://i2-prod.mirror.co.uk/incoming/article10718834.ece/ALTERNATES/s1200b/Argentine-football-star-Lionel-Messi-and.jpg", selected:false, title:"2"}, {id:9,link:"https://images2.minutemediacdn.com/image/upload/c_fill,w_912,h_516,f_auto,q_auto,g_auto/shape/cover/sport/595a09852ad9e54e48000001.jpg",selected:false, title:"3"}, {link:"https://i2-prod.irishmirror.ie/incoming/article10718951.ece/ALTERNATES/s615b/Lionel-Messi-and-Antonela-Rocuzzos-Wedding.jpg",selected:false, title:"4", id:10}, {link:"https://i.pinimg.com/originals/ec/41/b4/ec41b4cef7099c1c1faf812f25f6a9df.jpg", selected:false, title:"5", id:11}, {link:"https://i.dailymail.co.uk/i/pix/2017/07/02/11/41F612A100000578-4658578-image-m-10_1498989696960.jpg",selected:false, title:"6", id:12}, {id:13,link:"https://netstorage-legit.akamaized.net/images/vllkyt4avcu5o8j6v.jpg",selected:false, title:"1"},{id:14,link:"https://i2-prod.mirror.co.uk/incoming/article10718834.ece/ALTERNATES/s1200b/Argentine-football-star-Lionel-Messi-and.jpg", selected:false, title:"2"}, {id:15,link:"https://images2.minutemediacdn.com/image/upload/c_fill,w_912,h_516,f_auto,q_auto,g_auto/shape/cover/sport/595a09852ad9e54e48000001.jpg",selected:false, title:"3"}, {link:"https://i2-prod.irishmirror.ie/incoming/article10718951.ece/ALTERNATES/s615b/Lionel-Messi-and-Antonela-Rocuzzos-Wedding.jpg",selected:false, title:"4", id:16}, {link:"https://i.pinimg.com/originals/ec/41/b4/ec41b4cef7099c1c1faf812f25f6a9df.jpg", selected:false, title:"5", id:17}, {link:"https://i.dailymail.co.uk/i/pix/2017/07/02/11/41F612A100000578-4658578-image-m-10_1498989696960.jpg",selected:false, title:"6", id:18}, {id:19,link:"https://netstorage-legit.akamaized.net/images/vllkyt4avcu5o8j6v.jpg",selected:false, title:"1"},{id:20,link:"https://i2-prod.mirror.co.uk/incoming/article10718834.ece/ALTERNATES/s1200b/Argentine-football-star-Lionel-Messi-and.jpg", selected:false, title:"2"}, {id:21,link:"https://images2.minutemediacdn.com/image/upload/c_fill,w_912,h_516,f_auto,q_auto,g_auto/shape/cover/sport/595a09852ad9e54e48000001.jpg",selected:false, title:"3"}, {link:"https://i2-prod.irishmirror.ie/incoming/article10718951.ece/ALTERNATES/s615b/Lionel-Messi-and-Antonela-Rocuzzos-Wedding.jpg",selected:false, title:"4", id:22}, {link:"https://i.pinimg.com/originals/ec/41/b4/ec41b4cef7099c1c1faf812f25f6a9df.jpg", selected:false, title:"5", id:23}, {link:"https://i.dailymail.co.uk/i/pix/2017/07/02/11/41F612A100000578-4658578-image-m-10_1498989696960.jpg",selected:false, title:"6", id:24}, {id:25,link:"https://netstorage-legit.akamaized.net/images/vllkyt4avcu5o8j6v.jpg",selected:false, title:"1"},{id:26,link:"https://i2-prod.mirror.co.uk/incoming/article10718834.ece/ALTERNATES/s1200b/Argentine-football-star-Lionel-Messi-and.jpg", selected:false, title:"2"}, {id:27,link:"https://images2.minutemediacdn.com/image/upload/c_fill,w_912,h_516,f_auto,q_auto,g_auto/shape/cover/sport/595a09852ad9e54e48000001.jpg",selected:false, title:"3"}, {link:"https://i2-prod.irishmirror.ie/incoming/article10718951.ece/ALTERNATES/s615b/Lionel-Messi-and-Antonela-Rocuzzos-Wedding.jpg",selected:false, title:"4", id:28}, {link:"https://i.pinimg.com/originals/ec/41/b4/ec41b4cef7099c1c1faf812f25f6a9df.jpg", selected:false, title:"5", id:29}, {link:"https://i.dailymail.co.uk/i/pix/2017/07/02/11/41F612A100000578-4658578-image-m-10_1498989696960.jpg",selected:false, title:"6", id:30}, ], 
   //faceImagesList: [],   
    loading: true, //
    selectedImages: [],
    unselectedImages: [],   
  };

const faceImagesListReducer = (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.RESET_VALUES:
        return {
          ...state, 
          faceImagesList: [],
          selectedImages: [],
          unselectedImages:[],
        };
      case actionTypes.SEND_FACE_GET_IMAGES:
        return {
          ...state, 
          faceImagesList: action.payload,
          selectedImages: [],
          unselectedImages:action.payload,
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
        selectedList = state.faceImagesList

        return {
          ...state,
          faceImagesList: newList,
          selectedImages: [...selectedList],
          _unselectedImages: [],
          get unselectedImages() {
            return this._unselectedImages;
          },
          set unselectedImages(value) {
            this._unselectedImages = value;
          },
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
            unselectedImages: newList
         };

       case actionTypes.SELECT_IMAGE:
         state.faceImagesList[action.index].selected=true
         newList=state.faceImagesList
         filteredList=newList.filter(image=>image.selected)
         filteredList2=newList.filter(image=>!image.selected)
 
          return {
            ...state,
            faceImagesList: [...newList],
            selectedImages: [...filteredList],
            unselectedImages: [...filteredList2]
         };


         case actionTypes.SELECT_IMAGE_DECK:

            objIndex = state.faceImagesList.findIndex((obj => obj.id == action.index));
            state.faceImagesList[objIndex].selected=true
            newList=state.faceImagesList
            filteredList=newList.filter(image=>image.selected)
            filteredList2=newList.filter(image=>!image.selected)
    
             return {
               ...state,
               faceImagesList: [...newList],
               selectedImages: [...filteredList],
               unselectedImages: [...filteredList2]
            };


            case actionTypes.DESELECT_IMAGE_DECK:

                objIndex = state.faceImagesList.findIndex((obj => obj.id == action.index));
                state.faceImagesList[objIndex].selected=false
                newList=state.faceImagesList
                filteredList=newList.filter(image=>image.selected)
                filteredList2=newList.filter(image=>!image.selected)
        
                 return {
                   ...state,
                   faceImagesList: [...newList],
                   selectedImages: [...filteredList],
                   unselectedImages: [...filteredList2]
                };
   

      
       case actionTypes.DESELECT_IMAGE:
          state.faceImagesList[action.index].selected=false
          newList=state.faceImagesList
          filteredList=newList.filter(image=>image.selected)
          filteredList2=newList.filter(image=>!image.selected)
          return {
            ...state,
            faceImagesList: [...newList],
            selectedImages: [...filteredList],
            unselectedImages:[...filteredList2]
         };
        default:
            return state;
        }
      };


export default faceImagesListReducer;
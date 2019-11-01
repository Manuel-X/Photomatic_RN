import * as actionTypes from "../actions/types";

const initialState = {
    eventDetail: "",   
    eventDetailLoading: true,
  };

const EventReducer = (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.GET_EVENTDETAIL:
        return {
          ...state,
          eventDetail: action.payload,
          eventDetailLoading: false,
        };
      case actionTypes.EVENTDETAIL_LOADING:
        return {
          ...state,
          eventDetailLoading: true
       };
        default:
            return state;
        }
      };

export default EventReducer;

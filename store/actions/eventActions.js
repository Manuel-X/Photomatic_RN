import axios from "axios";
import * as actionTypes from "./types";

export const getEventDetail = (eventID) => {
    console.log("Event Detail requested!!!!")
    return async dispatch => {
      dispatch(setEventDetailLoading());
      try {
        const res = await axios.get(`http://48a724e4.ngrok.io/api/packages/${eventID}/`);
        const event = res.data;
        console.log("EVENT DETAIL!!!!!!!!!!!!!!!!",event)
        dispatch({
          type: actionTypes.GET_EVENTDETAIL,
          payload: event
        });
      } catch (err) {
        console.error("Error while fetching event detail", err);
      }
    };
  };

  
export const setEventDetailLoading = () => ({
    type: actionTypes.EVENTDETAIL_LOADING
  });
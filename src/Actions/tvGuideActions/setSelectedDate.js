import axios from "axios";
import React from "react";
import setScreenSize from "./checkScreenSize";

export const setSelectedDate = (date) => (dispatch) => {
  
  dispatch({
    type: "SET_SELECTED_DATE",
    payload: date,
  });
};



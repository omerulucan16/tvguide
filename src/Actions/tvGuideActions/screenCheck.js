import axios from "axios";
import React from "react";
import setScreenSize from "./setScreenSize";

export const checkScreenSize = (width) => (dispatch) => {
  
  dispatch({
    type: "SET_SCREEN_SIZE",
    payload: setScreenSize(width).perPage,
  });
};



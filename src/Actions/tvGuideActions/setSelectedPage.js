import axios from "axios";
import React from "react";
import setScreenSize from "./checkScreenSize";

export const setSelectedPage = (pageNumber) => (dispatch) => {
  
  dispatch({
    type: "SET_SELECTED_PAGE",
    payload: pageNumber,
  });
};



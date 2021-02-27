import axios from "axios";

export const setScreenSize = (perPageItem) => (dispatch) => {
  
  dispatch({
    type: "SET_SCREEN_SIZE",
    payload: perPageItem,
  });
};





export const setBusyIndicators = (busyId,status) => (dispatch) => {
  if(busyId === "01")
  {
    dispatch({
      type: "SET_BUSY_INDICATOR_GUIDE",
      payload: status,
    });
  }
  else
  {

  }
};



import dateformatter from "../Actions/tvGuideActions/dateformatter";
import setScreenSize from "../Actions/tvGuideActions/checkScreenSize";

const INITAL_STATE = {
  guideList: [],
  perPageItem: setScreenSize(window.innerWidth).perPage,
  screenWidth: setScreenSize(window.innerWidth).width,
  pageNumber: 1,
  oldPerPage: 0,
  selectedDate: undefined,
  guideListBusy: true,
};
const reducer = (state = INITAL_STATE, action) => {
  debugger;
  switch (action.type) {
    case "SET_GUIDE_LIST":
      return {
        ...state,
        selectedDate: action.payload.date,
        guideList: action.payload.channels,
        perPageItem: action.payload.perPageItem,
        pageNumber: action.payload.pageNumber,
      };
    case "SET_SCREEN_SIZE":
      debugger;
      return { ...state, perPageItem: action.payload };
    case "SET_SELECTED_DATE":
      return { ...state, selectedDate: action.payload, pageNumber: 1 };
    case "SET_SELECTED_PAGE":
      return { ...state, pageNumber: action.payload };
    case "SET_BUSY_INDICATOR_GUIDE":
      return {
        ...state,
        guideListBusy: action.payload,
      };
    default:
      return state;
  }
};
export default reducer;

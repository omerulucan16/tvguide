import dateformatter from "../Actions/tvGuideActions/dateformatter";
import setScreenSize from "../Actions/tvGuideActions/setScreenSize";

const INITAL_STATE = {
  guideList: [],
  perPageItem: setScreenSize(window.innerWidth).perPage,
  screenWidth: setScreenSize(window.innerWidth).width,
  pageNumber: 1,
  oldPerPage: 0,
  selectedDate: "12-01-2021"
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
      return { ...state, perPageItem: action.payload, guideList: [] };
    case "SET_SELECTED_DATE":
      return { ...state, selectedDate: action.payload };
    case "SET_PAGE_PROCESS":
      return {...state, pageNumber : action.payload === 'minus' ? (state.pageNumber-1) : (state.pageNumber+1) }
    default:
      return state;
  }
};
export default reducer;

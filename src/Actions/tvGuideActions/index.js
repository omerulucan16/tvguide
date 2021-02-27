import axios from "axios";
import dateformatter from "../../Actions/tvGuideActions/dateformatter";

export const getGuideList = (selectedDate, perPageItem, pageNumber) => (
  dispatch
) => {
  axios
    .get(
      "https://localhost:44387/api/getTvGuides/" +
        selectedDate +
        "/" +
        pageNumber +
        "/" +
        perPageItem
    )
    .then((res) => {
      res.data.date = selectedDate;
      res.data.pageNumber =pageNumber;
      res.data.perPageItem = perPageItem;
      
      dispatch({
        type: "SET_GUIDE_LIST",
        payload: res.data,
      });
    });
};



import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OwlCarousel from "react-owl-carousel2";
import "react-owl-carousel2/src/owl.carousel.css";
import "react-owl-carousel2/src/owl.theme.default.css";
import "../Partials/OwlCarousel/style.css";
import dateformatter from "../../Actions/tvGuideActions/dateformatter";
import { getGuideList } from "../../Actions/tvGuideActions/index";
import options from "../Partials/OwlCarousel/options";
import moment from "moment";
import { BounceLoader, BeatLoader } from "react-spinners";
import { pageProcess } from "../../Actions/tvGuideActions/pageProcess";
import { setSelectedDate } from "../../Actions/tvGuideActions/setSelectedDate";
import { setSelectedPage } from "../../Actions/tvGuideActions/setSelectedPage";
import checkScreenSize from "../../Actions/tvGuideActions/checkScreenSize";
import { setScreenSize } from "../../Actions/tvGuideActions/setScreenSize";

const Index = (props) => {
  const reduxState = useSelector((state) => state);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(
  //     // getGuideList(
  //     //   props.match.params.date !== undefined
  //     //     ? dateformatter(props.match.params.date)
  //     //     : dateformatter(
  //     //         new Date().getDate() +
  //     //           "-" +
  //     //           (new Date().getMonth() + 1) +
  //     //           "-" +
  //     //           new Date().getFullYear()
  //     //       ),
  //     //   reduxState.perPageItem,
  //     //   props.match.params.date === reduxState.selectedDate
  //     //     ? reduxState.pageNumber
  //     //     : 1
  //     // )
  //   );
  // }, [reduxState.perPageItem, reduxState.pageNumber, reduxState.selectedDate]);
  useEffect(() => {
    debugger;
    checkDateChanges(
      props.match.params.date !== undefined
        ? props.match.params.date
        : reduxState.selectedDate,
      reduxState.perPageItem
    );
  }, [reduxState.selectedDate]);
  useEffect(() => {
    debugger;
    let pageNumber = reduxState.pageNumber;
    let reduxPerPageItem = reduxState.perPageItem;
    let activeScreenPerPageItem = checkScreenSize(window.innerWidth).perPage;

    debugger;
    let newActivePage =
      (pageNumber * reduxPerPageItem) % activeScreenPerPageItem;
    if (newActivePage === 0) {
      newActivePage = (pageNumber * reduxPerPageItem) / activeScreenPerPageItem;
    }
    dispatch(setSelectedPage(newActivePage));
  }, [reduxState.perPageItem]);
  useEffect(() => {
    const handleResize = () => {
      checkDateChanges(
        props.match.params.date !== undefined
          ? props.match.params.date
          : reduxState.selectedDate,
        checkScreenSize(window.innerWidth).perPage
      );
    };
    window.addEventListener("resize", handleResize);
  }, []);

  const checkDateChanges = (selectedDate, perPageItem) => {
    debugger;
    if (selectedDate === undefined) {
      selectedDate =
        new Date().getDate() +
        "-" +
        (new Date().getMonth() + 1) +
        "-" +
        new Date().getFullYear();
    }
    dispatch(setSelectedDate(dateformatter(selectedDate)));
    dispatch(getGuideList(dateformatter(selectedDate), perPageItem, 1));
  };
  const checkScreenChanges = () => {};
  const pageChanges = (type) => {
    let status = false;
    let pageNumber = reduxState.pageNumber;
    if (type === "minus") {
      if (pageNumber > 1) {
        pageNumber = pageNumber - 1;
        status = true;
      }
    } else {
      pageNumber = pageNumber + 1;
      status = true;
    }
    if (status) {
      dispatch(setSelectedPage(pageNumber));
      dispatch(
        getGuideList(
          dateformatter(reduxState.selectedDate),
          reduxState.perPageItem,
          pageNumber
        )
      );
    }
  };
  return (
    <div>
      {reduxState.guideList.length === 0 ? (
        <div className="bouncer">
          <BounceLoader loading />
        </div>
      ) : (
        <div className="large-12 columns">
          <button onClick={() => pageChanges("a")}>Deneme</button>
          <OwlCarousel options={options}>
            {reduxState.guideList.map((channel) => (
              <div className="grid-item mb-4 " key={channel.channelId}>
                <div className="brand-cover">
                  <img
                    src="https://img.freeviewplay.tv/se9fa78602ef0e2ed93044629e5a5751e?w=160"
                    alt="Company Name"
                  />
                </div>
                {channel.programs.map((program) => (
                  <div
                    className={
                      "content" + (program.isActive === true ? " active" : "")
                    }
                  >
                    <div className="time">
                      {moment(program.start_time).format("DD/MM/YYYY HH:mm")}
                    </div>

                    <div className="program">{program.main_title}</div>
                  </div>
                ))}
              </div>
            ))}
          </OwlCarousel>
        </div>
      )}
    </div>
  );
};
export default Index;

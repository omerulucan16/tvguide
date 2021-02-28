import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OwlCarousel from "react-owl-carousel2";
import "react-owl-carousel2/src/owl.carousel.css";
import "react-owl-carousel2/src/owl.theme.default.css";
import "./style.css"
import dateformatter from "../../../Actions/tvGuideActions/dateformatter";
import { getGuideList } from "../../../Actions/tvGuideActions/index";
import options from "./options";
import moment from "moment";
import { BounceLoader, BeatLoader } from "react-spinners";
import { setSelectedDate } from "../../../Actions/tvGuideActions/setSelectedDate";
import { setSelectedPage } from "../../../Actions/tvGuideActions/setSelectedPage";
import { setBusyIndicators } from "../../../Actions/tvGuideActions/setBusyIndicators";
import checkScreenSize from "../../../Actions/tvGuideActions/checkScreenSize";
import { faAngleLeft,faAngleRight } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TvGuideOwl = (props) => {
  const reduxState = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    debugger;
    checkDateChanges(
      props.selectedDate !== undefined
        ? props.selectedDate
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
        props.selectedDate !== undefined
          ? props.selectedDate
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
    dispatch(setBusyIndicators("01",true));
    dispatch(setSelectedDate(dateformatter(selectedDate)));
    dispatch(getGuideList(dateformatter(selectedDate), perPageItem, 1));
  };
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
      dispatch(setBusyIndicators("01",true));
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
      {reduxState.guideListBusy === true ? (
        <div className="bouncer">
          <BeatLoader loading />
        </div>
      ) : reduxState.guideList.length === 0 ? null :  (
        <div className="large-12 columns">
          <button  onClick={() => pageChanges("minus")} className="btn-minus btn"><FontAwesomeIcon icon={faAngleLeft} /></button>
          <button onClick={() => pageChanges("increase")} className="btn-increase btn"><FontAwesomeIcon icon={faAngleRight} /></button>
          <OwlCarousel options={options}>
            {reduxState.guideList.map((channel) => (
              <div className="grid-item mb-4 " key={channel.channelId}>
                <div className="brand-cover">
                    
                  <img
                    src={"assets/img/companyLogo/"+channel.channelId+".png"}
                    alt={channel.channelSeo}
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
export default TvGuideOwl;

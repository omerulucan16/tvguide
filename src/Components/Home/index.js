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
import { setSelectedDate } from "../../Actions/tvGuideActions/setSelectedDate";
import { setSelectedPage } from "../../Actions/tvGuideActions/setSelectedPage";
import checkScreenSize from "../../Actions/tvGuideActions/checkScreenSize";
import { setBusyIndicators } from "../../Actions/tvGuideActions/setBusyIndicators";
import ErrorBoundary from '../ErrorBoundaries/ErrorBondary';
import TvGuideOwl from "../Partials/OwlCarousel/TvGuideOwl";

const Index = (props) => {
  const reduxState = useSelector((state) => state);

  return (
    <div>
      <ErrorBoundary>
      <TvGuideOwl selectedDate={props.match.params.date} />
      </ErrorBoundary>
      
    </div>
  );
};
export default Index;

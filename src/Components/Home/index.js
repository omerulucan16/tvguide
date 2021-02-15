import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OwlCarousel from "react-owl-carousel2";
import "react-owl-carousel2/src/owl.carousel.css";
import "react-owl-carousel2/src/owl.theme.default.css";
import "../Partials/OwlCarousel/style.css";
import dateformatter from "../../Actions/tvGuideActions/dateformatter";
import { getGuideList } from "../../Actions/tvGuideActions/index";
import { checkScreenSize } from "../../Actions/tvGuideActions/screenCheck";
import options from "../Partials/OwlCarousel/options";
import moment from "moment";
import { BounceLoader, BeatLoader } from "react-spinners";
import { pageProcess } from "../../Actions/tvGuideActions/pageProcess";

const Index = (props) => {
  const reduxState = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getGuideList(
        props.match.params.date !== undefined
          ? dateformatter(props.match.params.date)
          : dateformatter(
              new Date().getDate() +
                "-" +
                (new Date().getMonth() + 1) +
                "-" +
                new Date().getFullYear()
            ),
        reduxState.perPageItem,
        props.match.params.date === reduxState.selectedDate
          ? reduxState.pageNumber
          : 1
      )
    );
  }, [reduxState.perPageItem, reduxState.pageNumber, reduxState.selectedDate]);
  useEffect(() => {
    const handleResize = () => {
      dispatch(checkScreenSize(window.innerWidth));
    };
    window.addEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      {reduxState.guideList.length === 0 ? (
        <div className="bouncer">
          <BounceLoader loading />
        </div>
      ) : (
        <div className="large-12 columns">
          <button  onClick={() => dispatch(pageProcess('asd'))}>Deneme</button>
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

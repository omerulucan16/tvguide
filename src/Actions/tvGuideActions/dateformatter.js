const dateformatter = (date) => {
    debugger;
  const splitDate = date.split("-");
  let day = splitDate[0].length === 1 ? "0" + splitDate[0] : splitDate[0];
  let month = splitDate[1].length === 1 ? "0" + splitDate[1] : splitDate[1];
  let year = splitDate[2];
  return day + "-" + month + "-" + year;
};

export default dateformatter;

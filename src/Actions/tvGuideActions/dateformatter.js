const dateformatter = (date) => {
  debugger;
  const splitDate = date.split("-");
  debugger;
  if (splitDate.length !== 3) {
    const dateNow =
      new Date().getDate() +
      "-" +
      (new Date().getMonth() + 1) +
      "-" +
      new Date().getFullYear();
    let day =
      dateNow.split("-")[0].length === 1
        ? "0" + dateNow.split("-")[0]
        : dateNow.split("-")[0];
    let month =
      dateNow.split("-")[1].length === 1
        ? "0" + dateNow.split("-")[1]
        : dateNow.split("-")[1];
    let year = dateNow.split("-")[2];
    return day + "-" + month + "-" + year;
  } else {
    let day = splitDate[0].length === 1 ? "0" + splitDate[0] : splitDate[0];
    let month = splitDate[1].length === 1 ? "0" + splitDate[1] : splitDate[1];
    let year = splitDate[2];
    return day + "-" + month + "-" + year;
  }
};

export default dateformatter;

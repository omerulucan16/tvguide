const setScreenSize = (screenWidth) => {
    let perPageItem = 0;
    if (screenWidth > 1399) perPageItem = 6;
    else if (screenWidth > 1299) perPageItem = 5;
    else if (screenWidth > 1199) perPageItem = 4;
    else if (screenWidth > 599) perPageItem = 3;
    else perPageItem = 2;
    return { width: screenWidth, perPage: perPageItem };
  };

  export default setScreenSize;
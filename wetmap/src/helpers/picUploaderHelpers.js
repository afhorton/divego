function getToday(DateVal) {
  let yearValue = DateVal.getFullYear().toString();
  let monthValue = (DateVal.getMonth() + 1).toString();
  let dayValue = DateVal.getDate().toString();

  if (dayValue.length == 1) {
    dayValue = "0" + dayValue;
  }

  if (monthValue.length == 1) {
    monthValue = "0" + monthValue;
  }

  let formattedDate = yearValue + "-" + monthValue + "-" + dayValue;

  return formattedDate;
}

export { getToday };

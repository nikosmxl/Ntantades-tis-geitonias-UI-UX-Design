const getDateFromObj = (dateObj) => {
  return new Date(dateObj.year, dateObj.month - 1, dateObj.day)
};

const getDateFromMs = (ms) => {
  return new Date(ms);
};

const getDateFromSeconds = (seconds) => {
  return new Date(seconds * 1000);
};

const getFormattedDate = (date) => {
  const yyyy = date.getFullYear();
  let mm = date.getMonth() + 1; // Months start at 0!
  let dd = date.getDate();

  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;

  const formattedToday = dd + '/' + mm + '/' + yyyy;

  return formattedToday;
}

export {
  getDateFromObj,
  getDateFromMs,
  getDateFromSeconds,
  getFormattedDate,
};
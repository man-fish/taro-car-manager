export const formatTime = (date: Date): string => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return (
    [year, month, day].map(formatNumber).join("-") +
    " " +
    [hour, minute, second].map(formatNumber).join(":")
  );
};

export const formatMonthTime = (date: Date): string => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return (
    [month, day].map(formatNumber).join("-") +
    " " +
    [hour, minute, second].map(formatNumber).join(":")
  );
};

export const formatMonth = (
  date: Date,
  mOffset: number = 0,
  dOffset: number = 0
): string => {
  const month = date.getMonth() + 1 + mOffset;
  const day = date.getDate() + dOffset;

  return [month, day].map(formatNumber).join("-");
};

export const formatYear = (
  date: Date,
  yOffset: number = 0,
  mOffset: number = 0,
  dOffset: number = 0
): string => {
  const year = date.getFullYear() + yOffset;
  const month = date.getMonth() + 1 + mOffset;
  const day = date.getDate() + dOffset;

  return [year, month, day].map(formatNumber).join("-");
};

export const expendDuration = (
  beginDate: string,
  endDate: string
): Array<string> => {
  let dates: Array<string> = [];
  let dateTime: Date = new Date(beginDate);
  let curDate: string = formatYear(dateTime);
  while (curDate !== formatYear(new Date(endDate))) {
    curDate = formatYear(dateTime);
    dates.push(formatNumber(new Date(dateTime).getDate()));
    dateTime = new Date(dateTime.setDate(dateTime.getDate() + 1));
  }
  return dates;
};

const formatNumber = n => {
  n = n.toString();
  return n[1] ? n : "0" + n;
};

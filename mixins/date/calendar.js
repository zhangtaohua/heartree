import { reactive } from "vue";

const leapYearMonth = [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const normalYearMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
export const dateHeader = ["日", "一", "二", "三", "四", "五", "六"];

export function isEarly(date1, date2) {
  const dateFirst = new Date(date1);
  const dateSecond = new Date(date2);
  return dateFirst > dateSecond;
}

export function isLeapYear(year) {
  if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
    return true;
  }
  return false;
}

export function getDateFormat(dateNow) {
  let date = dateNow.getDate();
  // const day = dateNow.getDay()
  let month = dateNow.getMonth() + 1;
  const year = dateNow.getFullYear();

  month = month > 9 ? month : "0" + month;
  date = date > 9 ? date : "0" + date;

  return `${year}-${month}-${date}`;
}

export function getDateFormatStr(dateStr = "") {
  let dateNow = null;
  if (dateStr === "") {
    dateNow = new Date();
  } else {
    dateNow = new Date(dateStr);
  }

  return getDateFormat(dateNow);
}

export function useCalendar() {
  const calendarData = reactive({
    isStartLimit: false,
    isEndLimit: false,
    startLimitDate: null,
    endLimitDate: null,
    dateShowArray: [],
  });

  function setLimitdate(startTime, endTime) {
    if (startTime) {
      calendarData.isStartLimit = true;
      calendarData.startLimitDate = startTime;
    } else {
      calendarData.isStartLimit = false;
      calendarData.startLimitDate = null;
    }

    if (endTime) {
      calendarData.isEndLimit = true;
      calendarData.endLimitDate = endTime;
    } else {
      calendarData.isEndLimit = false;
      calendarData.endLimitDate = null;
    }
  }

  function getDateShowArray(dateStr = "", initObj = {}) {
    let dateNow = null;
    if (dateStr === "") {
      dateNow = new Date();
      dateNow.setTime(dateNow.getTime() + 3600 * 1000 * 24 * 1);
    } else {
      dateNow = new Date(dateStr);
    }

    const date = dateNow.getDate(); // 1~31
    const day = dateNow.getDay(); // 0-6
    let month = dateNow.getMonth() + 1; // 0~11 -> 1~12
    const year = dateNow.getFullYear();

    let lastYear = year;
    let nextYear = year;

    let lastMonth = month - 1;
    if (lastMonth < 1) {
      lastMonth = 12;
      lastYear = year - 1;
    }

    let nextMonth = month + 1;
    if (nextMonth > 12) {
      nextMonth = 1;
      nextYear = year + 1;
    }

    let daysOfMonth = 0;
    let lastDaysOfMonth = 0;
    let nextDaysOfMonth = 0;

    let isLeap = isLeapYear(year);
    if (isLeap) {
      daysOfMonth = leapYearMonth[month];
    } else {
      daysOfMonth = normalYearMonth[month];
    }

    isLeap = isLeapYear(lastYear);
    if (isLeap) {
      lastDaysOfMonth = leapYearMonth[lastMonth];
    } else {
      lastDaysOfMonth = normalYearMonth[lastMonth];
    }

    isLeap = isLeapYear(nextYear);
    if (isLeap) {
      nextDaysOfMonth = leapYearMonth[nextMonth];
    } else {
      nextDaysOfMonth = normalYearMonth[nextMonth];
    }

    const monthstr = month > 9 ? month : "0" + month;
    const dateFirst = new Date(`${year}-${monthstr}-01`);
    const beforeDay = dateFirst.getDay(); // 0-6
    const beforeInsertDays = beforeDay;

    const afterInsertDays = 7 - ((daysOfMonth - (7 - beforeDay)) % 7);

    const tempDateArray = [];
    // 只能放在外面
    lastMonth = lastMonth > 9 ? lastMonth : "0" + lastMonth;
    for (let i = beforeInsertDays - 1; i >= 0; i--) {
      let tempDay = lastDaysOfMonth - i;
      tempDay = tempDay > 9 ? tempDay : "0" + tempDay;
      const fullDate = `${lastYear}-${lastMonth}-${tempDay}`;
      const initTemp = initObj[fullDate];
      const tempDate = {
        ...initTemp,
        date: tempDay,
        fullDate: fullDate,
        isLight: false,
        isLast: 1,
      };
      tempDateArray.push(tempDate);
    }

    month = month > 9 ? month : "0" + month;
    for (let i = 1; i <= daysOfMonth; i++) {
      let tempDay = i;
      tempDay = tempDay > 9 ? tempDay : "0" + tempDay;
      let tempDate = null;
      const fullDate = `${year}-${month}-${tempDay}`;
      const initTemp = initObj[fullDate];
      if (
        calendarData.startLimitDate &&
        parseInt(year) === calendarData.startLimitDate.year &&
        parseInt(month) === calendarData.startLimitDate.month &&
        i < calendarData.startLimitDate.date
      ) {
        tempDate = {
          ...initTemp,
          date: tempDay,
          fullDate: fullDate,
          isLight: false,
          isLast: 2,
        };
      } else {
        tempDate = {
          ...initTemp,
          date: tempDay,
          fullDate: fullDate,
          isLight: true,
          isLast: 2,
        };
      }

      tempDateArray.push(tempDate);
    }

    nextMonth = nextMonth > 9 ? nextMonth : "0" + nextMonth;
    for (let i = 1; i <= afterInsertDays; i++) {
      let tempDay = i;
      tempDay = tempDay > 9 ? tempDay : "0" + tempDay;
      const fullDate = `${nextYear}-${nextMonth}-${tempDay}`;
      const initTemp = initObj[fullDate];
      const tempDate = {
        ...initTemp,
        date: tempDay,
        fullDate: fullDate,
        isLight: false,
        isLast: 3,
      };
      tempDateArray.push(tempDate);
    }

    const dateShowArray = [];
    for (let i = 0; i < tempDateArray.length; i = i + 7) {
      dateShowArray.push(tempDateArray.slice(i, i + 7));
    }

    calendarData.dateShowArray = dateShowArray;
  }

  return {
    calendarData,
    setLimitdate,
    getDateShowArray,
  };
}

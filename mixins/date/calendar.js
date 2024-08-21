import { reactive } from "vue";

const leapYearMonth = [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const normalYearMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const dateHeader = ["日", "一", "二", "三", "四", "五", "六"];

function isEarly(date1, date2) {
  const dateFirst = new Date(date1);
  const dateSecond = new Date(date2);
  return dateFirst > dateSecond;
}

function isLeapYear(year) {
  if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
    return true;
  }
  return false;
}

function getDateFormat(dateNow) {
  let date = dateNow.getDate();
  // const day = dateNow.getDay()
  let month = dateNow.getMonth() + 1;
  const year = dateNow.getFullYear();

  month = month > 9 ? month : "0" + month;
  date = date > 9 ? date : "0" + date;

  return `${year}-${month}-${date}`;
}

function getDate(dateStr = "") {
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
  });

  function setLimitdate(startTime, endTime) {
    if (startTime) {
      calendarData.isStartLimit = true;
    } else {
      calendarData.isStartLimit = false;
      calendarData.startLimitDate = null;
    }

    if (endTime) {
      calendarData.isEndLimit = true;
    } else {
      calendarData.isEndLimit = false;
      calendarData.endLimitDate = null;
    }
  }

  function getDateShowArray(dateStr = "") {
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

    let isLeap = this.isLeapYear(year);
    if (isLeap) {
      daysOfMonth = this.leapYearMonth[month];
    } else {
      daysOfMonth = this.normalYearMonth[month];
    }

    isLeap = this.isLeapYear(lastYear);
    if (isLeap) {
      lastDaysOfMonth = this.leapYearMonth[lastMonth];
    } else {
      lastDaysOfMonth = this.normalYearMonth[lastMonth];
    }

    isLeap = this.isLeapYear(nextYear);
    if (isLeap) {
      nextDaysOfMonth = this.leapYearMonth[nextMonth];
    } else {
      nextDaysOfMonth = this.normalYearMonth[nextMonth];
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
      const tempDate = {
        date: tempDay,
        fullDate: `${lastYear}-${lastMonth}-${tempDay}`,
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
      if (
        parseInt(year) === this.startLimitDate.year &&
        parseInt(month) === this.startLimitDate.month &&
        i < this.startLimitDate.date
      ) {
        tempDate = {
          date: tempDay,
          fullDate: `${year}-${month}-${tempDay}`,
          isLight: false,
          isLast: 2,
        };
      } else {
        tempDate = {
          date: tempDay,
          fullDate: `${year}-${month}-${tempDay}`,
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
      const tempDate = {
        date: tempDay,
        fullDate: `${nextYear}-${nextMonth}-${tempDay}`,
        isLight: false,
        isLast: 3,
      };
      tempDateArray.push(tempDate);
    }

    this.dateShowArrar = [];
    for (let i = 0; i < tempDateArray.length; i = i + 7) {
      this.dateShowArrar.push(tempDateArray.slice(i, i + 7));
    }
  }

  return {};
}

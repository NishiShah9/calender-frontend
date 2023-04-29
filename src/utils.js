/*
 * create a date array [1,8,15,22,29]...
 */
export const getDateArray = () => {
  let dateArr = [];
  for (let i = 1; i <= 7; i++) {
    let numArr = [];
    for (let j = i; j <= 31; j += 7) {
      numArr.push(j);
    }
    dateArr.push(numArr);
  }
  return dateArr;
};

/*
 *  create a day array [1,2,..7]
 */
export const getDayArray = () => {
  let dayArr = [];
  for (let i = 1; i <= 7; i++) {
    let dayTempArr = [];
    for (let j = i; j <= 7; j++) {
      dayTempArr.push(j);
    }
    for (let j = 1; j <= i - 1; j++) {
      dayTempArr.push(j);
    }
    dayArr.push(dayTempArr);
  }
  return dayArr;
};

/*
 *  create a month array based on year
 */
export const getMonthArray = (year) => {
  let arr = [];
  let monthCount = {
    28: [],
    29: [],
    30: [],
    31: [],
  };
  for (let month = 0; month < 12; month++) {
    let date = new Date(year, month, 1);
    let totalDaysOfMonth = new Date(year, month, 0).getDate();
    let monthValue = month;
    monthCount[totalDaysOfMonth].push(monthValue);
    let dayOfWeek = date.getDay();
    arr[dayOfWeek] = arr[dayOfWeek]
      ? [...arr[dayOfWeek], month + 1]
      : [month + 1];
  }

  let tempA = arr[0];
  arr.shift();
  arr.push(tempA);
  let arrLen = Math.max(...arr.map((e) => e.length));
  let resultArray = [];
  for (let i = 0; i < arrLen; i++) {
    let subArray = [];
    arr.map((e) => {
      if (e.length > 0) {
        subArray.push(e[i]);
      }
    });
    resultArray.push(subArray);
  }
  return {
    resultArray,
    monthCount,
  };
};

/*
 * create a week array
 */
export const getWeeks = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
/*
 * create a month array
 */
export const getMonths = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEPT",
  "OCT",
  "NOV",
  "DEC",
];

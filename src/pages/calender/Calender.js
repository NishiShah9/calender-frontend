import React, { useState, useEffect } from "react";
import "./calender.css";
import Box from "@mui/material/Box";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CircleIcon from "@mui/icons-material/Circle";

import {
  getDateArray,
  getDayArray,
  getMonthArray,
  getMonths,
  getWeeks,
} from "../../utils";
import EventModal from "../../components/EventModal";
import calenderApi from "../../axios/calenderApi";

const Calender = () => {
  const [year, setYear] = useState(new Date().getFullYear()); // get current year
  const [monthData, setMonthData] = useState([]); // set month data
  const [monthsCount, setMonthsCounts] = useState(); // set month count like 28,30,31
  const [open, setOpen] = React.useState(false); // open modal
  const [apiData, setApiDate] = useState([]); // set api data for calender Event
  const [selectedDateEvent, setSelectedDateEvent] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // set current selected month
  const [selectedDate, setSelectedDate] = useState();
  const [refeshData, setRefetchData] = useState(false);
  const [todayDate, setTodayDate] = useState([
    // set the today date
    new Date().getDate(),
    new Date().getMonth() + 1,
    new Date().getFullYear(),
  ]);
  const [inputData, setInputData] = useState([]); // set input values for event modal
  const [loader, setLoader] = useState(false);
  const dateArray = getDateArray(); // get date array [1,2...31]
  const dayArr = getDayArray(); // get day array [1,2...7]
  const dayNameArray = getWeeks; // get day name [mon..sun]
  const monthArray = getMonths; // get month [jan...dec]

  /* get calender data from API based on Year & month */
  const getCalenderData = async (year, month) => {
    setLoader(true);
    let response;
    try {
      let body = {
        year,
        month,
      };
      response = await calenderApi.getCalenderList(body);
      setApiDate(response?.data?.result);
      setLoader(false);
    } catch (error) {
      setLoader(false);
    }
  };

  /* From API data get the selected All dates to display blue Dot */
  useEffect(() => {
    if (apiData?.length > 0) {
      let selectedDate = [];
      apiData?.map((item) => {
        selectedDate.push(parseInt(item.date));
      });
      setSelectedDateEvent(selectedDate);
    } else {
      setSelectedDateEvent([]);
    }
    setRefetchData(false)
  }, [apiData]);

  /* get Api data when month change */
  useEffect(() => {
    if (year && selectedMonth) {
      getCalenderData(year, selectedMonth);
    }
  }, [selectedMonth, refeshData]);

  /* update month data based on year change  */
  useEffect(() => {
    if (year) {
      let result = getMonthArray(year);
      setMonthData(result?.resultArray);
      setMonthsCounts(result.monthCount);
      setYear(year);
      getCalenderData(year, selectedMonth);
    }
  }, [year]);

  /* open modal for event when click on date  */
  const handleOpenModal = (date, isExistEvent) => {
    setOpen(true);
    let newDate = `${selectedMonth}-${date}-${year}`;
    setSelectedDate(newDate);
    if (isExistEvent) {
      let data = apiData.filter((item) => {
        return item.date == date;
      });
      if (data.length > 0) {
        let inputData = [];
        data.map((item) => {
          inputData.push({
            type: "text",
            value: item.title,
            id: item._id,
            showInput: false,
          });
        });
        setInputData(inputData);
      }
    }
  };

  /* close modal for event  */
  const handleCloseModal = () => {
    setInputData([]);
    setOpen(false);
  };

  /* handle change event for input inside the modal  */
  const handleChange = (e) => {
    e.preventDefault();
    const index = e.target.id;
    setInputData((s) => {
      const newArr = s.slice();
      newArr[index].value = e.target.value;
      return newArr;
    });
  };

  /* input close event inside the modal */
  const handleCloseEvent = (index) => {
    let filterData = inputData.filter((item, i) => i !== index);
    setInputData(filterData);
  };

  /* input edit event inside the modal */
  const handleInputEdit = (index) => {
    setInputData((s) => {
      const newArr = s.slice();
      newArr[index].showInput = !newArr[index].showInput;
      return newArr;
    });
  };

  /* change func for next year  */
  const goToNextYear = () => {
    setYear(year + 1);
  };

  /* change func for prev year  */
  const goToPreviousYear = () => {
    setYear(year - 1);
  };

  /* add input value */
  const addInput = () => {
    setInputData((s) => {
      return [
        ...s,
        {
          type: "text",
          value: "",
          showInput: true,
        },
      ];
    });
  };

  /* Update the api Based on Submit modal */
  const submitEvent = async () => {
    let isPrevList = apiData.filter(
      (item) => item.date == new Date(selectedDate).getDate()
    );
    // delete the calender event
    isPrevList.map(async (item) => {
      let isExist = inputData.filter((sub) => sub.id == item._id);
      if (isExist.length == 0) {
        await calenderApi.deleteCalenderEvent(item._id);
      }
    });
    // add and update the calender event
    inputData.map(async (item) => {
      if (item.showInput) {
        if (item.id) {
          await calenderApi.updateCalenderEvent({ title: item.value }, item.id);
        } else {
          await calenderApi.addCalenderEvent({
            title: item.value,
            date: new Date(selectedDate).toString(),
          });
        }
      }
    });
    setOpen(false);
    setRefetchData(true);
  };
  
  /* Month Content */
  const monthContent = () =>
    monthData.map((val) => {
      return (
        <tr>
          {val.map((item) => {
            let className = "green-text";
            if (
              monthsCount[28].includes(item) ||
              monthsCount[29].includes(item)
            ) {
              className = "yellow-text";
            } else if (monthsCount[30].includes(item)) {
              className = "purple-text";
            } else if (monthsCount[31].includes(item)) {
              className = "green-text";
            }
            if (selectedMonth == item) {
              className += " selected-underline";
            }
            return (
              <td key={item} className="pointer" onClick={() => setSelectedMonth(item)}>
                <b className={className}>{monthArray[item - 1]}</b>
              </td>
            );
          })}
        </tr>
      );
    });

  /* Date Content */
  const dateContent = () =>
    dateArray.map((val) => {
      return (
        <tr>
          {val.map((item) => {
            let className;
            let isEventExist = selectedDateEvent?.includes(item);
            if (item === 29 || item === 28) {
              className = "yellow-text";
            } else if (item === 30) {
              className = "purple-text";
            } else if (item === 31) {
              className = "green-text";
            }
            if (
              todayDate[0] == item &&
              todayDate[1] == selectedMonth &&
              todayDate[2] == year
            ) {
              className += " selected-underline";
            }
            return (
              <td
                key={item}
                className="date-content"
                onClick={() => handleOpenModal(item, isEventExist)}
              >
                <b className={className}>{item}</b>
                {isEventExist && (
                  <Box sx={{ textAlign: "right" }}>
                    <CircleIcon
                      sx={{ height: "12px", width: "12px", color: "blue" }}
                    />
                  </Box>
                )}
              </td>
            );
          })}
        </tr>
      );
    });

  /* Day Content */
  const dayContent = () =>
    dayArr.map((val) => {
      return (
        <tr>
          {val.map((item) => {
            return (
              <td>
                <b className={item === 7 && "red-text"}>
                  {dayNameArray[item - 1]}
                </b>
              </td>
            );
          })}
        </tr>
      );
    });

  return (
    <Box className="container">
      <table>
        <tr>
          <td>
            <div className="container-table">
              <button className="btn" onClick={goToPreviousYear}>
                <ArrowBackIosNewIcon />
              </button>
              <span className="year-title">{year}</span>
              <button className="btn" onClick={goToNextYear}>
                <ArrowForwardIosIcon />
              </button>
            </div>
          </td>
          <td>
            <table>{monthContent()}</table>
          </td>
        </tr>
        <tr>
          <td>
            <table>{dateContent()}</table>
          </td>
          <td>
            <table>{dayContent()}</table>
          </td>
        </tr>
      </table>
      <EventModal
        inputData={inputData}
        open={open}
        handleCloseModal={handleCloseModal}
        handleChange={handleChange}
        handleInputEdit={handleInputEdit}
        handleCloseEvent={handleCloseEvent}
        addInput={addInput}
        submitEvent={submitEvent}
      />
    </Box>
  );
};

export default Calender;

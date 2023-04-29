import axiosInstance from "./apiConfig";

const API_URL = {
  api: "/calender",
};
/* get all calender data based on filter year & month */
const getCalenderList = async (body) => {
  try {
    return await axiosInstance.get(
      API_URL.api,
      { params: body },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  } catch (error) {
    console.log(error);
    throw new Error(error?.response?.data?.message);
  }
};

/* Add calender event Api */
const addCalenderEvent = async (data) => {
  try {
    return await axiosInstance.post(API_URL.api, data);
  } catch (error) {
    console.log(error);
    throw new Error(error?.response?.data?.message);
  }
};
/* Update calender event Api */
const updateCalenderEvent = async (data, id) => {
  try {
    return await axiosInstance.put(
      `${process.env.REACT_APP_BACKEND_URL}${API_URL.api}/${id}`,
      data
    );
  } catch (error) {
    console.log(error);
    throw new Error(error?.response?.data?.message);
  }
};
/* Delete calender event Api */
const deleteCalenderEvent = async (id) => {
  try {
    return await axiosInstance.delete(
      `${process.env.REACT_APP_BACKEND_URL}${API_URL.api}/${id}`
    );
  } catch (error) {
    console.log(error);
    throw new Error(error?.response?.data?.message);
  }
};
export default {
  getCalenderList,
  addCalenderEvent,
  updateCalenderEvent,
  deleteCalenderEvent,
};

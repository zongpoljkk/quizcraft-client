import axios from "axios";
import { API_HOST } from "../../global/const";

export const getSubjects = async () => {
  try {
    const res = await axios.get(`${API_HOST}/api/subtopic/get-all-subjects`);
    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.error("Unable to load subjects from server");
  }
  return Promise.reject(new Error("getSubjects"));
};


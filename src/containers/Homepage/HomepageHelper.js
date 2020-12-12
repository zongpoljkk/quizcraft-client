import axios from "axios";
import backend from "../../global/const";

export const getSubjects = async () => {
  try {
    const res = await axios.get(`${backend}/subtopic/get-all-subjects`);
    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.error("Unable to load subjects from server");
  }
  return Promise.reject(new Error("getSubjects"));
};

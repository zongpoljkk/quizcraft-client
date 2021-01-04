import axios from "axios";

import backend from "../../ip";

export const useSendReport = (user_id, problem_id, report_content, date) => {
  const sendReport = async () => {
    try {
      const response = await axios.post(backend+"report/add-report", {
        userId : user_id,
        problemId: problem_id,
        body: report_content,
        timestamp: date
      })
      const { success, data } = response.data;
      if (success) {
        console.log("hooray!");
      } else {
        console.log("send report Error");
      } 
    } catch (error) {
      console.log("There are something wrong about send report :(");
    }
  };

  return { sendReport };
};
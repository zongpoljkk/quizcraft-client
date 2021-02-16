import { useState } from "react";
import axios from "axios";

import backend from "../../ip";

export const useSendReport = (user_id, problem_id, report_content, date) => {
  const [report_success, set_report_success] = useState();
  const [report_loading, set_report_loading] = useState(false);

  const sendReport = async () => {
    set_report_loading(true);
    try {
      const response = await axios.post(backend+"report/add-report", {
        userId : user_id,
        problemId: problem_id,
        body: report_content,
        timestamp: date
      })
      const { success, data } = response.data;
      if (success) {
        set_report_success(true);
        set_report_loading(false);
      } else {
        console.log("send report Error");
      } 
    } catch (error) {
      if(error.response.status === 400){
        set_report_success(false);
      };
      console.log("There are something wrong about send report :(");
    }
  };

  return { sendReport, report_success, report_loading };
};
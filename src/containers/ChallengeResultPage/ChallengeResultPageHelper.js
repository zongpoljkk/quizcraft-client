import { useState } from "react";
import axios from "axios";

import backend from "../../ip";

export const secondToHour = (secs) => {
  var seconds = parseInt(secs, 10);
    var hours   = Math.floor(seconds / 3600);
    var minutes = Math.floor((seconds - (hours * 3600)) / 60);
    seconds = seconds - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    var time = hours+':'+minutes+':'+seconds;
    return time;
};

export const useGetChallengeInfo = (user_id, challenge_id) => {
  const [my_info, set_my_info] = useState();
  const [challenger_info, set_challenger_info] = useState();

  const getChallengeInfo = async () => {
    try {
      const response = await axios.get(backend+"challenge/challenge-info", {
        params: {
          userId : user_id,
          challengeId : challenge_id
        }
      });
      const { success, data } = response.data;
      if (success) {
        set_my_info(data.me);
        set_challenger_info(data.opponent);
        console.log(data);
      } else {
        console.log("getChallengeInfo Error");
      } 
    } catch (e) {
      console.log("There are something wrong about get challenge info :(");
    }
  };

  return { getChallengeInfo, my_info, challenger_info };
};
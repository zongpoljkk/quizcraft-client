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
      } else {
        console.log("getChallengeInfo Error");
      } 
    } catch (e) {
      console.log("There are something wrong about get challenge info :(");
    }
  };

  return { getChallengeInfo, my_info, challenger_info };
};

export const useGetFinalChallengeResult = (user_id, challenge_id) => {
  const [loading, set_loading] = useState(true);
  const [my_result, set_my_result] = useState();
  const [challenger_result, set_challenger_result] = useState();

  const getFinalChallengeResult = async () => {
    set_loading(true);
    try {
      const response = await axios.get(backend+"challenge/get-final-challenge-result", {
        params: {
          userId : user_id,
          challengeId : challenge_id
        }
      });
      const { success, data } = response.data;
      if (success) {
        set_my_result(data.me);
        set_challenger_result(data.opponent);
        set_loading(false);
      } else {
        console.log("getFinalChallengeResult Error");
      } 
    } catch (e) {
      console.log("There are something wrong about get final challenge result :(");
    }
  };

  return { getFinalChallengeResult, loading, my_result, challenger_result };
};
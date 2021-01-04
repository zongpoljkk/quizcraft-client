import { useState } from "react";
import axios from "axios";

import backend from "../../ip";

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
import { useState } from "react";
import axios from "axios";

import backend from "../../ip";

const CHALLENGE_BOX_WIDTH_WITH_MARGIN_RIGHT = 118;
const CHALLENGE_BOX_WIDTH = 106;

export const getMarginRightOfChallengeBox = (container_width, set_margin_right, lenght) => {
  var marginRight = [];
  var challenges_box_width = 0;
  for (let index = 0; index < lenght; index++) {
    if(challenges_box_width + CHALLENGE_BOX_WIDTH_WITH_MARGIN_RIGHT <= container_width) {
      challenges_box_width = challenges_box_width+CHALLENGE_BOX_WIDTH_WITH_MARGIN_RIGHT;
      marginRight[index] = 12;
    }
    else if(challenges_box_width + CHALLENGE_BOX_WIDTH <= container_width) {
      challenges_box_width = challenges_box_width+CHALLENGE_BOX_WIDTH;
      marginRight[index] = 0;
    }
    else {
      challenges_box_width = CHALLENGE_BOX_WIDTH_WITH_MARGIN_RIGHT;
      marginRight[index] = 12;
    }
  };
  set_margin_right(marginRight);
};

export const useGetALlMyChallenges = (user_id, subtopic_name, difficulty) => {
  const [loading, set_loading] = useState(true);
  const [my_turns, set_my_turns] = useState();
  const [challenger_turns, set_challenger_turns] = useState();
  const [results, set_results] = useState();

  const getALlMyChallenges = async () => {
    set_loading(true);
    try {
      const response = await axios.get(backend+"challenge/get-all-my-challenges", {
        params: {
          userId : user_id,
          subtopicName : subtopic_name,
          difficulty : difficulty
        }
      });
      const { succes, data } = response.data;
      if (succes) {
        set_my_turns(data.myTurn);
        set_challenger_turns(data.theirTurn);
        set_results(data.result);
        set_loading(false);
      } else {
        console.log("getALlMyChallenges Error");
      } 
    } catch (e) {
      console.log("There are something wrong about get all challenges :(");
    }
  };

  return { getALlMyChallenges, loading, my_turns, challenger_turns, results };
};
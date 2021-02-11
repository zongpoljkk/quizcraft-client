import { useState } from "react";
import axios from "axios";

import backend from "../../ip";

export const useGetALlMyChallenges = (user_id, subtopic_name, difficulty) => {
  const [loading, set_loading] = useState(true);
  const [my_turns, set_my_turns] = useState();
  const [challenger_turns, set_challenger_turns] = useState();
  const [results, set_results] = useState();

  const getALlMyChallenges = async () => {
    set_loading(true);
    try {
      const response = await axios.get(
        backend + "challenge/get-all-my-challenges",
        {
          params: {
            userId: user_id,
            subtopicName: subtopic_name,
            difficulty: difficulty,
          },
        }
      );
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

export const useReadChallenge = () => {
  const readChallenge = async (user_id, challenge_id) => {
    try {
      const response = await axios.put(backend + "challenge/read-challenge", {
        userId: user_id,
        challengeId: challenge_id,
      });
      const { success, isRead } = response.data;
      if (success) {
        console.log("isRead", isRead);
      } else {
        console.log("readChallenge Error");
      }
    } catch (e) {
      console.log("There are something wrong about read challenge :(");
    }
  };

  return { readChallenge };
};
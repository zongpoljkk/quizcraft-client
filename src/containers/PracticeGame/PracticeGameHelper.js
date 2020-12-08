import { useState } from "react";
import axios from "axios";

import backend from "../../ip";
import { API_HOST } from "../../global/const";
import { useLocation } from "react-router-dom";

export const useGetHintByProblemId = (problemId) => {
  const [hint, set_hint] = useState();

  const getHintByProblemId = async () => {
    try {
      const response = await axios.get(backend + "hint/get-hint/", {
        params: {
          problemId: problemId,
        },
      });
      const { success, data } = response.data;
      if (success) {
        set_hint(data.body);
      } else {
        console.log("getHintByProblemId Error");
      }
    } catch (e) {
      console.log("There are something wrong about get hint :(");
    }
  };

  return { getHintByProblemId, hint };
};

export const getAndCheckAnswer = async (
  history,
  problemId,
  userId,
  userAnswer,
  userTime,
  topic
) => {
  try {
    const response = await axios.get(`${API_HOST}/put-difficulty-index`, {
      params: {
        problemId: problemId,
        userId: userId,
        userAnswer: userAnswer,
        userTime: userTime,
        topic: topic,
      },
    });
    if (response.status === 200) {
      history.push({
        pathname: "/" + problemId,
        state: {
          problemId: problemId,
          userId: userId,
          correct: response.data.correct,
        },
      });
    }
  } catch (error) {
    console.error("Unable to get and check answer and update difficulty index");
  }
  return Promise.reject(new Error("getAndCheckAnswer"));
};

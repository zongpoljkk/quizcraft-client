import { useState } from "react";
import axios from "axios";

import backend from "../../ip";

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
  problemId,
  userId,
  userAnswer,
  userTime,
  topic,
  subtopic
) => {
  try {
    const url = `${backend}problem/get-and-check-answer`;
    // const params = {
    // problemId: problemId,
    // userId: userId,
    // userAnswer: userAnswer,
    // userTime: userTime,
    // topic: topic,
    // subtopic, subtopic,
    // };
    const data = {
      problemId: problemId,
      userId: userId,
      userAnswer: userAnswer,
      userTime: userTime,
      topic: topic,
      subtopic: subtopic,
    };
    const options = {
      method: "POST",
      url: url,
      headers: { "content-type": "application/json" },
      data: JSON.stringify(data),
      // headers: { "content-type": "application/x-www-form-urlencoded" },
      // params: params,
    };
    const response = await axios(options);
    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    console.error("Unable to get and check answer and update difficulty index");
  }
  return Promise.reject(new Error("getAndCheckAnswer"));
};

import { useState } from "react";
import axios from "axios";

import backend from "../../ip";

export const useGetChallengeInfo = (user_id, challenge_id) => {
  const [loading_info, set_loading_info] = useState(true);
  const [my_info, set_my_info] = useState();
  const [challenger_info, set_challenger_info] = useState();

  const getChallengeInfo = async () => {
    set_loading_info(true);
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
        set_loading_info(false);
        return (my_info);
      } else {
        console.log("getChallengeInfo Error");
      } 
    } catch (e) {
      console.log("There are something wrong about get challenge info :(");
    }
  };

  return { getChallengeInfo, loading_info, my_info, challenger_info };
};

export const useGetProblemByChallengeId = () => {
  const [loading_problem, set_loading_problem] = useState(true);
  const [problem_id, set_problem_id] = useState();
  const [body, set_body] = useState();
  const [answer_type, set_answer_type] = useState();
  const [title, set_title] = useState();
  const [correct_answer, set_correct_answer] = useState();
  const [choices, set_choices] = useState();

  const getProblemByChallengeId = async (challenge_id, problem_index) => {
    set_loading_problem(true);
    try {
      const response = await axios.get(backend+"challenge/get-problem", {
        params: {
          challenge_id : challenge_id,
          problem_index: problem_index
        }
      });
      const { success, data } = response.data;
      if (success) {
        set_problem_id(data.problem._id);
        set_body(data.problem.body);
        set_answer_type(data.problem.answerType);
        set_title(data.problem.title);
        set_choices(data.problem.choices);
        set_correct_answer(data.correct_answer);
        set_loading_problem(false);
      } else {
        console.log("getProblemByChallengeId Error");
      } 
    } catch (e) {
      console.log("There are something wrong about get problem by challenge id :(");
    }
  };

  return { getProblemByChallengeId, loading_problem, problem_id, body, answer_type, title, correct_answer, choices };
};

export const getAndCheckAnswer = async (
  problemId,
  userId,
  userAnswer,
  userTime,
  subject,
  topic,
  subtopic,
  mode,
  challengeId,
  problemIndex,
) => {
  try {
    const url = `${backend}problem/get-and-check-answer`;
    const data = {
      problemId: problemId,
      userId: userId,
      userAnswer: userAnswer,
      userTime: userTime,
      subject: subject,
      topic: topic,
      subtopic: subtopic,
      mode: mode,
      challengeId: challengeId,
      problemIndex: problemIndex,
    };
    const options = {
      method: "POST",
      url: url,
      data: JSON.stringify(data),
      headers: { "content-type": "application/json" },
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

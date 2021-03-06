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

  const reset_hint = () => {
    set_hint();
  };

  return { getHintByProblemId, hint, reset_hint };
};

export const getAndCheckAnswer = async (
  problemId,
  userId,
  userAnswer,
  userTime,
  topic,
  subtopic,
  mode,
) => {
  try {
    const url = `${backend}problem/get-and-check-answer`;
    const data = {
      problemId: problemId,
      userId: userId,
      userAnswer: userAnswer,
      userTime: userTime,
      topic: topic,
      subtopic: subtopic,
      mode: mode,
    };
    const options = {
      method: "POST",
      url: url,
      headers: { "content-type": "application/json" },
      data: JSON.stringify(data),
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

export const useGetProblemForUser = (
  user_id,
  subject,
  subtopic_name,
  difficulty
) => {
  const [loading, set_loading] = useState(true);
  const [problem_id, set_problem_id] = useState();
  const [body, set_body] = useState();
  const [answer_type, set_answer_type] = useState();
  const [title, set_title] = useState();
  const [correct_answer, set_correct_answer] = useState();
  const [correct_answer_for_display, set_correct_answer_for_display] = useState();
  const [choices, set_choices] = useState();
  const [have_hint, set_have_hint] = useState();

  const getProblemForUser = async (set_skip = () => {}) => {
    set_loading(true);
    try {
      const response = await axios.post(
        backend + "problem/get-problem-for-user",
        {
          userId: user_id,
          subject: subject,
          subtopicName: subtopic_name,
          difficulty: difficulty,
        }
      );
      const { success, data } = response.data;
      if (success) {
        set_problem_id(data.problem._id);
        set_body(data.problem.body);
        set_answer_type(data.problem.answerType);
        set_title(data.problem.title);
        set_choices(data.problem.choices);
        set_correct_answer(data.correctAnswer);
        set_correct_answer_for_display(data.correctAnswerForDisplay);
        set_have_hint(data.problem.haveHint);
        set_loading(false);
        set_skip("UN_USE");
      } else {
        console.log("getProblemForUser Error");
      }
    } catch (e) {
      console.log("There are something wrong about get problem :(");
    }
  };

  return {
    getProblemForUser,
    loading,
    problem_id,
    body,
    answer_type,
    title,
    correct_answer,
    correct_answer_for_display,
    choices,
    have_hint
  };
};

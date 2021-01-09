import { useState } from "react";
import axios from "axios";

import backend from "../../ip";

export const useGetHintByProblemId = (problemId) => {
  const [hint, set_hint] = useState();

  const getHintByProblemId = async () => {
    try {
      const response = await axios.get(backend+"hint/get-hint/", {
        params: {
          problemId: problemId
        }
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

  return { getHintByProblemId, hint, set_hint };
};

export const useGetEachProblem = (user_id, subject, subtopic_name, difficulty) => {
  const [loading, set_loading] = useState(true);
  const [problem_id, set_problem_id] = useState();
  const [body, set_body] = useState();
  const [answer_type, set_answer_type] = useState();
  const [title, set_title] = useState();
  const [correct_answer, set_correct_answer] = useState();
  const [choices, set_choices] = useState();

  const getEachProblem = async (set_item = () => {}) => {
    set_loading(true);
    try {
      const response = await axios.post(backend+"problem/get-problem-for-user", {
        userId : user_id,
        subject: subject,
        subtopicName : subtopic_name,
        difficulty : difficulty
      });
      const { success, data } = response.data;
      if (success) {
        set_problem_id(data.problem._id);
        set_body(data.problem.body);
        set_answer_type(data.problem.answerType);
        set_title(data.problem.title);
        set_choices(data.problem.choices);
        set_correct_answer(data.correctAnswer);
        set_loading(false);
        set_item("UN_USE");
      } else {
        console.log("getProblemForUser Error");
      } 
    } catch (e) {
      console.log("There are something wrong about get problem :(");
    }
  };

  return { getEachProblem, loading, problem_id, set_problem_id, body, answer_type, title, correct_answer, choices };
};

export const useGetAmountOfItems = (user_id) => {
  const [amount_of_hints, set_amount_of_hints] = useState(0);
  const [amount_of_skips, set_amount_of_skips] = useState(0);
  const [amount_of_refreshs, set_amount_of_refreshs] = useState(0);

  const getAmountOfItems = async () => {
    try {
      const response = await axios.get(backend+"user/get-amount-of-items", {
        params: {
          userId: user_id
        }
      });
      if (response.data) {
        set_amount_of_hints(response.data.hint);
        set_amount_of_skips(response.data.skip);
        set_amount_of_refreshs(response.data.refresh);
      } else {
        console.log("getAmountOfItems Error");
      } 
    } catch (e) {
      console.log("There are something wrong about get amount of items :(");
    }
  };

  return { getAmountOfItems, amount_of_hints, amount_of_skips, amount_of_refreshs };
};

export const useItem = (user_id) => {
  
  const putUseItem = async (item_name) => {
    try {
      const response = await axios.put(backend+"user/used-item", {
        userId: user_id,
        itemName: item_name
      });
      const { success, data } = response.data;
      if (success) {
        console.log("used",item_name);
      } else {
        console.log("putUseItem Error");
      } 
    } catch (e) {
      console.log("There are something wrong about use items :(");
    }
  };

  return { putUseItem };
};
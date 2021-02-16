import { useState } from "react";
import axios from "axios";

import backend from "../../ip";

export const useGetGroupGame = (user_id, group_id) => {
  const [current_index, set_current_index] = useState();
  const [number_of_problem, set_number_of_problem] = useState();
  const [time_per_problem, set_time_per_problem] = useState();
  const [user, set_user] = useState();
  const [problem, set_problem] = useState();
  const [is_creator, set_is_creator] = useState();
  const [loading, set_loading] = useState(true);

  const getGroupGame = async () => {
    set_loading(true);
    try {
      const response = await axios.get(backend + "group/get-group-game", {
        params: {
          userId: user_id,
          groupId: group_id
        }
      });
      const { success, data } = response.data;
      if (success) {
        set_current_index(data.currentIndex);
        set_number_of_problem(data.numberOfProblem);
        set_time_per_problem(data.timePerProblem);
        set_user(data.user);
        set_problem(data.problem);
        set_is_creator(data.isCreator);
        set_loading(false);
      } else {
        console.log("getGroupGame Error");
      } 
    } catch (error) {
      console.log("There are something wrong about get group game :(");
    }
  };

  return { getGroupGame, loading, current_index, number_of_problem, time_per_problem, user, problem, is_creator };
};

export const useGetNumberOfAnswer = (group_id) => {
  const [number_of_answer, set_number_of_answer] = useState();
  const [number_of_members, set_number_of_members] = useState();

  const getNumberOfAnswer = async () => {
    try {
      const response = await axios.get(backend + "group/get-number-of-answer", {
        params: {
          groupId: group_id
        }
      });
      const { success, data } = response.data;
      if (success) {
        set_number_of_answer(data.numberOfAnswer);
        set_number_of_members(data.numberOfMembers);
      } else {
        console.log("getNumberOfAnswer Error");
      }
    } catch (error) {
      console.log("There are something wrong about get number of asnwer :(");
    }
  };

  return { getNumberOfAnswer, number_of_answer, number_of_members };
};

export const useGetNextProblem = (group_id) => {

  const getNextProblem = async () => {
    try {
      const response = await axios.post(backend + "group/next-problem", {
        groupId: group_id
      });
      const { success, data } = response.data;
      if (success) {
      } else {
        console.log("getNextProblem Error");
      }
    } catch (error) {
      console.log("There are something wrong about get next problem :(");
    }
  };

  return { getNextProblem };
};

export const checkGroupAnswer = async (user_id, problem_id, user_answer, mode, group_id, used_time) => {
  try {
    const response = await axios.post(backend + "practice/check-answer", {
      userId: user_id,
      problemId: problem_id,
      userAnswer: user_answer,
      mode: mode,
      groupId: group_id,
      usedTime: used_time,

    })
    return response.data
  } catch (error) {
    console.log("There are something wrong when checking for answer :(");
  }
}

export const showAnswer = async (group_id) => {
  try {
    const response = await axios.get(backend + "group/show-answer", {
      params: {
        groupId: group_id
      }
    });
    return response.data
  } catch (error) {
    console.log("There are something wrong when show answer :(");
  }
}
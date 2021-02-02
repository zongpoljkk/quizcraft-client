import React, { useState } from "react";
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
  const [current_index_after_click_next, set_current_index_after_click_next] = useState();

  const getNextProblem = async () => {
    try {
      const response = await axios.post(backend + "group/next-problem", {
        groupId: group_id
      });
      const { success, data } = response.data;
      if (success) {
        set_current_index_after_click_next(data.currentIndex);
      } else {
        console.log("getNextProblem Error");
      }
    } catch (error) {
      console.log("There are something wrong about get next problem :(");
    }
  };

  return { getNextProblem, current_index_after_click_next };
};

export const useServerSentEvent = () => {
  const [listening, set_listening] = useState(false);
  const [next_problem, set_next_problem] = useState();
  const [send_answer, set_send_answer] = useState();
  const token = localStorage.getItem("token");

  const subscribe = async (group_id) => {
    const status = listening;
    if (!status) {
      const events = await new EventSource(`${backend}group/event?groupId=${group_id}`, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      });
      events.onmessage = event => {
        const parsedData = JSON.parse(event.data);
        switch (parsedData.type) {
          case "INIT_CONNECTION":
            console.log("init")
            break;
          case "NEXT_PROBLEM":
            set_next_problem(parsedData.message);
            console.log("next_problem");
            break;
          case "SEND_ANSWER":
            set_send_answer(parsedData.message);
            console.log("send_answer");
            break;
        }
      };
    } else {
      await axios.delete(`${backend}group/close/`);
      console.log("unsubscribed")
    }
    set_listening(!listening);
  };
  return { listening, subscribe, next_problem, send_answer };
};
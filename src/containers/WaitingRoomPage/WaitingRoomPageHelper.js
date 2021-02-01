import React, { useState } from "react";
import axios from "axios";
import EventSource from "eventsource"

import backend from "../../ip";

export const useGetGroupMembers = (group_id, user_id) => {
  const [members, set_members] = useState();
  const [number_of_members, set_number_of_members] = useState();
  const [is_creator, set_is_creator] = useState();
  const [loading, set_loading] = useState(true);
  const [group_failed, set_group_failed] = useState(false);

  const getGroupMembers = async () => {
    set_loading(true);
    try {
      const response = await axios.get(backend + "group/get-all-group-members", {
        params: {
          groupId: group_id,
          userId: user_id
        }
      });
      const { succes, data } = response.data;
      if (succes) {
        set_members(data.members);
        set_number_of_members(data.numberOfMembers);
        set_is_creator(data.isCreator);
        set_loading(false);
      } else {
        console.log("getGroupMembers Error");
      }
    } catch (error) {
      if (error.response.status === 500) {
        set_group_failed(true);
      } else {
        console.log("There are something wrong about leave group :(");
      }
    }
  }; 

  return { getGroupMembers, loading, members, number_of_members, is_creator, group_failed };
};

export const useDeleteGroup = (group_id, user_id) => {
  const deleteGroup = async () => {
    try {
      const response = await axios.delete(backend+"group/delete-group", {
        data: {
          groupId: group_id,
          userId : user_id,
        }
      })
      const { success, data } = response.data;
      if (success) {
        console.log(data);
      } else {
        console.log("delete group Error");
      } 
    } catch (e) {
      console.log(e)
      console.log("There are something wrong about delete group :(");
    }
  };
  
  return { deleteGroup };
};

export const useLeaveGroup = (group_id, user_id) => {
  const leaveGroup = async () => {
    try {
      const response = await axios.put(backend+"group/leave-group", {
        groupId: group_id,
        userId : user_id,
      })
      const { success, data } = response.data;
      if (success) {
        console.log(data);
      } else {
        console.log("leave group Error");
      } 
    } catch (error) {
      console.log("There are something wrong about leave group :(");
    }
  };
  
  return { leaveGroup };
};

export const useGetGenerateProblem = () => {
  const [start_loading, set_start_loading] = useState(false);
  const [problems, set_problems] = useState();
  const [number_of_problems, set_number_of_problems] = useState();

  const getGenerateProblem = async ( group_id ) => {
    set_start_loading(true);
    try {
      const response = await axios.post(backend+"group/gen-problems-when-group-start", {
        groupId : group_id
      });
      const { success, data } = response.data;
      if (success) {
        set_problems(data.problems);
        set_number_of_problems(data.numberOfProblem);
        set_start_loading(false);
      } else {
        console.log("getGenerateProblem Error");
      } 
    } catch (error) {
      console.log("There are something wrong about generate problem :(");
    }
  };

  return { getGenerateProblem, start_loading, problems };
};

export const useServerSentEvent = (getGroupMembers = () => {}) => {
  const [listening, set_listening] = useState(false);
  const [next_problem, set_next_problem] = useState();
  const [start_game, set_start_game] = useState();
  const [update_member, set_update_member] = useState();
  const [restart_game, set_restart_game] = useState();
  const [send_answer, set_send_answer] = useState();
  const token = localStorage.getItem("token");

  const subscribe = async (group_id) => {
    const status = listening;
    if (!status) {
      const events = new EventSource(`${backend}group/event?groupId=${group_id}`, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      });
      events.onmessage = event => {
        const parsedData = JSON.parse(event.data);
        console.log(event.data)
        switch (parsedData.type) {
          case "INIT_CONNECTION":
            console.log("init")
            break;
          case "UPDATE_MEMBER":
            set_update_member(parsedData.message);
            console.log("update_member");
            getGroupMembers();
            break;
          case "START_GAME":
            set_start_game(parsedData.message);
            console.log("start_game");
            break;
          // case "NEXT_PROBLEM":
          //   set_next_problem(parsedData.message);
          //   console.log("next_problem");
          //   break;
          // case "RESTART_GAME":
          //   set_restart_game(parsedData.message);
          //   console.log("restart_game");
          //   break;
          // case "SEND_ANSWER":
          //   set_send_answer(parsedData.message);
          //   console.log("send_answer");
          //   break;
        }
      };
    } else {
      await axios.delete(`${backend}group/close/`);
      console.log("unsub");
    }
    set_listening(!listening);
  };
  return { listening, subscribe, update_member, start_game, next_problem, restart_game, send_answer };
};
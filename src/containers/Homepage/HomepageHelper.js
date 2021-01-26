import { useState } from "react";
import axios from "axios";
import backend from "../../ip";
//--------------------------test-server-sent-event----------------------//
import EventSource from "eventsource"

export const useGetSubjects = () => {
  const [subjects, set_subjects] = useState([]);
  const [subjects_loading, set_subjects_loading] = useState(true);

  const getSubjects = async () => {
    try {
      const res = await axios.get(`${backend}subtopic/get-all-subjects`);
      if (res.status === 200) {
        set_subjects(res.data.data);
        set_subjects_loading(false);
      }
    } catch (error) {
      console.error("Unable to load subjects from server");
      return Promise.reject(new Error("getSubjects"));
    }
  };
  return { getSubjects, subjects_loading, subjects };
};

export const useGetLeaderBoard = (user_id) => {
  const [leader_board_loading, set_leader_board_loading] = useState(true);
  const [leader_board, set_leader_board] = useState();

  const getLeaderBoard = async () => {
    try {
      const response = await axios.get(
        backend + "leader-board/get-leader-board",
        {
          params: {
            userId: user_id,
          },
        }
      );
      const { success, data } = response.data;
      if (success) {
        set_leader_board(data);
        set_leader_board_loading(false);
      } else {
        console.log("getLeaderBoard Error");
      }
    } catch (e) {
      console.log("There are something wrong about get LeaderBoard  :(");
    }
  };

  return { getLeaderBoard, leader_board_loading, leader_board };
};


//---------------------------------test-server-sent-event-----------------------------//
export const useServerSentEvent = (groupId, token) => {
  const [listening, set_listening] = useState(false);
  const [next_problem, set_next_problem] = useState();
  const [start_game, set_start_game] = useState();
  const [update_member, set_update_member] = useState();
  const [restart_game, set_restart_game] = useState();
  const [send_answer, set_send_answer] = useState();

  const status_message = {
    subscribed: "Subscribed",
    unsubscribed: "Unsubscribed"
  };

  const subscribe = async () => {
    const status = listening;
    if (!status) {
      //subscribe (when join group)
      const events = new EventSource(`${backend}group/event?groupId=${groupId}`, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      });
      events.onmessage = event => {
        const parsedData = JSON.parse(event.data);
        console.log(event)
        //example
        switch (parsedData.type) {
          case "INIT_CONNECTION":
            console.log("init")
            break;
          case "NEXT_PROBLEM":
            set_next_problem(parsedData.message);
            console.log("next_problem");
            break;
          case "START_GAME":
            set_start_game(parsedData.message);
            console.log("start_game");
            break;
          case "UPDATE_MEMBER":
            set_update_member(parsedData.message);
            console.log("update_member");
            break;
          case "RESTART_GAME":
            set_restart_game(parsedData.message);
            console.log("restart_game");
            break;
          case "SEND_ANSWER":
            set_send_answer(parsedData.message);
            console.log("send_answer");
            break;
        }
      };
    } else {
      //unsubscribe (when leave group -> waiting room, game result)
      await axios.delete(`${backend}group/close/`);
    }
    set_listening(!listening);
  };
  return { listening, subscribe, status_message, next_problem, update_member, start_game, restart_game, send_answer };
}

export const useNextProblem = (groupId) => {
  const [current_problem_index,set_current_problem] = useState();

  const nextProblem = async () => {
    try {
      const response = await axios.post(
        backend + "group/next-problem",
        {
          groupId: groupId,
        }
      );
      const { success, data } = response.data;
      if (success) {
        set_current_problem(data.currentIndex);
      } else {
        console.log("next problem Error");
      }
    } catch (e) {
      console.log("There are something wrong about next problem  :(");
    }
  }

  return { current_problem_index, nextProblem };
}

export const useGetGroupGame = (user_id, group_id) => {
  const [current_index, set_current_index] = useState();
  const [number_of_problem, set_number_of_problem] = useState();
  const [time_per_problem, set_time_per_problem] = useState();
  const [user, set_user] = useState();
  const [problem, set_problem] = useState();
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
        set_loading(false);
      } else {
        console.log("getGroupGame Error");
      } 
    } catch (error) {
      console.log("There are something wrong about get group game :(");
    }
  };

  return { getGroupGame, loading, current_index, number_of_problem, time_per_problem, user, problem };
};
//-----------------------------------------------------------------------------------//
import { useState } from "react";
import axios from "axios";
import backend from "../../ip";

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

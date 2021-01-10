import React, { useState } from "react";
import axios from "axios";

import backend from "../../ip";

export const getSubjects = async () => {
  try {
    const res = await axios.get(`${backend}subtopic/get-all-subjects`);
    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.error("Unable to load subjects from server");
  }
  return Promise.reject(new Error("getSubjects"));
};

export const useGetLeaderBoard = (user_id) => {
  const [loading, set_loading] = useState(true);
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
        set_loading(false);
      } else {
        console.log("getLeaderBoard Error");
      }
    } catch (e) {
      console.log("There are something wrong about get LeaderBoard  :(");
    }
  };

  return { getLeaderBoard, loading, leader_board };
};

export const useGetAchievements = (user_id) => {
  const [achievements_loading, set_achievements_loading] = useState(true);
  const [achievements, set_achievements] = useState();

  const getAchievements = async () => {
    try {
      const response = await axios.get(
        backend + "achievement/my-achievements",
        {
          params: {
            userId: user_id,
          },
        }
      );
      const { success, data } = response.data;
      if (success) {
        set_achievements(data);
        set_achievements_loading(false);
      } else {
        console.log("getAchievements Error");
      }
    } catch (e) {
      console.log("There are something wrong about getAchievements :(");
    }
  };
  return { getAchievements, achievements_loading, achievements };
};

import { useState } from "react";
import axios from "axios";
import useSWR from 'swr'

import backend from "../../ip";

const token = localStorage.getItem("token");

export const useGetSubjects = () => {
  const fetcher = (url) => axios.get(url, { headers: { "Authorization" : `Bearer ${token}` } }).then(res => res.data);
  const { data: subjects } = useSWR( `${backend}subtopic/get-all-subjects`, fetcher);

  if(!subjects?.success){
    console.log("useGetSubjects Error");
  }

  return { subjects };
};

export const useGetLeaderBoard = (user_id) => {

  const fetcher = (url) => axios.get(url, { headers: { "Authorization" : `Bearer ${token}` } }).then(res => res.data);
  const { data: leader_board } = useSWR( `${backend}leader-board/get-leader-board?userId=` + user_id, fetcher);

  if(!leader_board?.success){
    console.log("useGetLeaderBoard Error");
  }

  return { leader_board };
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

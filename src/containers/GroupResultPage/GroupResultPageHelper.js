import React, { useState } from "react";
import axios from "axios";

import backend from "../../ip";

export const useGetGroupScoreBoard = (group_id, user_id) => {
  const [loading, set_loading] = useState(true);
  const [scoreboard, set_scoreboard] = useState();
  const [numboer_of_problem, set_numboer_of_problem] = useState();
  const [user_index, set_user_index] = useState();
  const [is_creator, set_is_creator] = useState();

  const getGroupScoreBoard = async () => {
    try {
      const response = await axios.get(backend + "group/group-scoreboard/", {
        params: {
          groupId: group_id,
          userId: user_id
        }
      });
      const { success, data } = response.data;
      if (success) {
        var member_lists = [];
        data[0].members.map((member, index) => (
          member_lists[index] = {
            score: member.score,
            point: member.point,
            username: member.username
          }
        ))
        set_scoreboard(member_lists);
        set_numboer_of_problem(data[0].numberOfProblem);
        set_user_index(data[0].userIndex);
        set_is_creator(data[0].isCreator);
        set_loading(false);
      } else {
        console.log("getGroupScoreBoard Error");
      } 
    } catch (e) {
      console.log("There are something wrong about get group scoreBoard  :(");
    }
  };

  return { getGroupScoreBoard, loading, scoreboard, numboer_of_problem, user_index, is_creator  };
};
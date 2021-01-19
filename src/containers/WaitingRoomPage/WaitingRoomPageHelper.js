import React, { useState } from "react";
import axios from "axios";

import backend from "../../ip";

export const useGetGroupMembers = (group_id, user_id) => {
  const [members, set_members] = useState();
  const [number_of_members, set_number_of_members] = useState();
  const [is_creator, set_is_creator] = useState();
  const [loading, set_loading] = useState(true);

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
      console.log("There are something wrong about get group members :(");
    }
  };

  return { getGroupMembers, loading, members, number_of_members, is_creator };
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
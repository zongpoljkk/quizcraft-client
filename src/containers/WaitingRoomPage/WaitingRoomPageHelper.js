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
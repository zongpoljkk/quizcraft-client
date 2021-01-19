import React, { useState } from "react";
import axios from "axios";

import backend from "../../ip";

export const useJoinGroup = () => {
  const [group_id, set_group_id] = useState();
  const [join_fail, set_join_fail] = useState();

  const joinGroup = async (user_id, pin) => {
    try {
      const response = await axios.put(backend + "group/join-group", {
        userId: user_id,
        pin: pin
      });
      const { success, data } = response.data;
      if (success) {
        set_group_id(data.groupId);
      } else {
        console.log("joinGroup Error");
      } 
    } catch (error) {
      if(error.response.status === 400){
        set_join_fail(error.response.data.error);
      }
      console.log("There are something wrong about joining group  :(");
    }
  };

  return { joinGroup, group_id, join_fail };
};
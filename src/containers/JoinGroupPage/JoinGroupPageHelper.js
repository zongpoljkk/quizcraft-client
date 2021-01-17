import React, { useState } from "react";
import axios from "axios";

import backend from "../../ip";

export const useJoinGroup = () => {
  const [group_id, set_group_id] = useState();

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
    } catch (e) {
      console.log("There are something wrong about joining group  :(");
    }
  };

  return { joinGroup, group_id };
};
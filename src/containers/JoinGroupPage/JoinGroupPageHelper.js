import React, { useState } from "react";
import axios from "axios";

import backend from "../../ip";

export const useJoinGroup = () => {
  const [loading, set_loading] = useState(false);
  const [group_id, set_group_id] = useState();
  const [group_info, set_group_info] = useState();
  const [join_fail, set_join_fail] = useState();

  const joinGroup = async (user_id, pin, toggle) => {
    set_loading(true);
    try {
      const response = await axios.put(backend + "group/join-group", {
        userId: user_id,
        pin: pin
      });
      const { success, data } = response.data;
      if (success) {
        set_group_id(data.groupId);
        set_group_info(data.groupInfo);
        set_loading(false);
        toggle();
      } else {
        console.log("joinGroup Error");
      } 
    } catch (error) {
      if(error.response.status === 400){
        set_join_fail(error.response.data.error);
        set_loading(false);
        toggle();
        console.log(error.response.data.error)
      }
      console.log("There are something wrong about joining group  :(");
    }
  };

  return { joinGroup, loading, group_id, group_info, join_fail };
};

export const translateError = (message) => {
  switch (message) {
    case "The group does not exist":
      return "ไม่พบกลุ่มนี้ภายในระบบ กรุณาลองใหม่อีกครั้ง"
    case "The game has already started":
      return "ขณะนี้เกมได้เริ่มต้นขึ้นแล้ว กรุณาลองใหม่อีกครั้งในภายหลัง"
    default:
      return "มีข้อผิดพลาด กรุณาลองใหม่อีกครั้ง"
  };
};
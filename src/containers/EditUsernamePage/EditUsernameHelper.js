import { useState } from "react";
import axios from "axios";

import backend from "../../ip";

export const useEditUsername = (user_id, new_username) => {
  const [edited_username, set_edited_username] = useState();
  const [error_message, set_error_message] = useState();

  const editUsername = async () => {
    try {
      const response = await axios.put(backend+"user/edit-username", {
        userId : user_id,
        username: new_username,
      })
      const { success, data } = response.data;
      if (success) {
        set_edited_username(data.username);
        set_error_message(null);
      } else {
        console.log("edit username Error");
      } 
    } catch (error) {
      if(error.response.status === 400){
        set_error_message(error.response.data.error);
      }
      else{
        console.log("There are something wrong about edit username :(");
      }
    }
  };

  return { editUsername, edited_username, error_message };
};

export const engToThai = (error_message) => {
  switch (error_message) {
    case "Username cannot be blank!":
      return "ชื่อผู้ใช้ไม่สามารถเว้นว่างได้"
    case "already have this username!":
      return "ชื่อผู้ใช้นี้มีคนใช้แล้ว"
    case "userId not match userId that decoded from token!":
      return "ไม่อนุญาตให้แก้ชื่อผู้ใช้ของบัญชีอื่น"
    default:
      return "ชื่อผู้ใช้ต้องมีความยาว 6-12 ตัว ประกอบด้วยตัวอักษร ตัวเลข ตัวอักษรพิเศษ _ และ - เท่านั้น"
  }
}
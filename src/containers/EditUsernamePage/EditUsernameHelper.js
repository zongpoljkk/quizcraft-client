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
import { useState } from "react";
import axios from "axios";

import backend from "../../ip";

export const useEditUsername = (user_id, new_username) => {
  const [edited_username, set_edited_username] = useState();
  const [error_message, set_error_message] = useState();

  const editUsername = async () => {
    await axios.put(backend+"user/edit-username", {
      userId : user_id,
      username: new_username,
    })
    .then(response => {
      const { success, data } = response.data;
      if (success) {
        set_edited_username(data.username);
        set_error_message(null);
      }
      else {
        console.log("Error")
      }
    })
    .catch (error =>  {
      if(!error.response.data.success){
        set_error_message(error.response.data.error);
        console.log(error_message);
      }
    });
};

  return { editUsername, edited_username, error_message };
};
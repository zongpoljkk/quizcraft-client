import { useState } from "react";
import axios from "axios";
import backend from "../../ip";

export const useChangeProfileImage = () => {
  const [change_image_loading, set_change_image_loading] = useState(false);
  const [change_image_success, set_change_image_success] = useState(false);

  const changeProfileImage = async (formData) => {
    set_change_image_loading(true);
    try {
      const response = await axios.put(
        backend + "user/change-profile-picture",
        formData,
        {
          headers: {
            "Content-type": "multipart/form-data",
          },
        }
      );
      const { success, data } = response.data;
      if (success) {
        set_change_image_success(true);
      } else {
        console.log("Change Profile Image Error");
      }
    } catch (error) {
      console.log("There are something wrong about change profile image  :(");
    }
    set_change_image_loading(false);
  };

  return { changeProfileImage, change_image_loading, change_image_success };
};


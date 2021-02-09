import { useState } from "react";
import axios from "axios";
import backend from "../../ip";
import { ITEM_NAME } from "../../global/const";

export const useActivateItem = (user_id) => {
  const [activate_item_loading, set_activate_item_loading] = useState(false);
  const [use_success, set_use_success] = useState(false);

  const activateItem = async (item) => {
    var item_name;
    if (item.itemName == ITEM_NAME.FREEZE) {
      item_name = "freeze";
    } else if (item.itemName == ITEM_NAME.DOUBLE) {
      item_name = "double";
    }
    set_activate_item_loading(true);
    try {
      const response = await axios.post(backend + `item/use-${item_name}-item`, {
        userId: user_id,
      });
      const { success, data } = response.data;
      if (success) {
        set_use_success(success);
      } else {
        console.log("use item Error");
      }
    } catch (err) {
      console.log(err.response);
      console.log("There are something wrong about use item :(");
    }
    set_activate_item_loading(false);
  };

  return { activateItem, activate_item_loading, use_success };
};

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


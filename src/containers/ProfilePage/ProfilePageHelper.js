import { useState } from "react";
import axios from "axios";

import backend from "../../ip";
import { ITEM_NAME } from "../../global/const";

export const useActivateItem = (user_id) => {
  const [use_item_loading, set_use_item_loading] = useState(false);
  const [use_success, set_use_success] = useState(false);

  const activateItem = async (item) => {
    var item_name;
    if (item.itemName == ITEM_NAME.FREEZE) {
      item_name = "freeze";
    } else if (item.itemName == ITEM_NAME.DOUBLE) {
      item_name = "double";
    }
    set_use_item_loading(true);
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
  };

  return { activateItem, use_item_loading, use_success };
};

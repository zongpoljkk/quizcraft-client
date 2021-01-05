import { useState } from "react";
import axios from "axios";

import backend from "../../ip";

export const useGetAllItems = () => {
  const [loading, set_loading] = useState(true);
  const [items, set_items] = useState();

  const getAllItems = async () => {
    try {
      const response = await axios.get(backend+"item/");
      const { success, data } = response.data;
            
      if (success) {
        var item_lists = [];
        data.map((item, index) => (
          item_lists[index] = {
            item_name: item.name,
            src: item.image_info.data,
            animation_data: item.lottie_info.data,
            price: item.price,
            item_description: item.description,
          }
        ))
        set_items(item_lists);
        set_loading(false);
      } else {
        console.log("getAllItems Error");
      } 
    } catch (e) {
      console.log("There are something wrong about get all items :(");
    }
  };

  return { getAllItems, loading, items };
};
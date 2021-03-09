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

export const useBuyItem = (user_id, item) => {
  const [buy_success, set_buy_success] = useState(false);
  const [buy_error_msg, set_buy_error_msg] = useState();

  const buyItem = async () => {
    try {
      const response = await axios.put(backend+"user/buy-item", {
        userId : user_id,
        itemName: item,
      })
      const { success, data } = response.data;
      if (success) {
        set_buy_success(success)
      } else {
        console.log("buy item Error");
      } 
    } catch (error) {
      if(error.response.status === 400 || error.response.status === 500){
        set_buy_error_msg(translateError(error.response.data.error));
        set_buy_success(false);
        console.log(error.response.data.error)
      }
      console.log("There are something wrong about buy item :(");
    }
  };

  return { buyItem, buy_success, buy_error_msg };
};

export const translateError = (message) => {
  switch (message) {
    case "You don't have enough money to buy this item!":
      return "คุณมีเงินไม่เพียงพอในการซื้อไอเทมนี้"
    case "Number of item cannot exceed 999":
      return "คุณมีจำนวนไอเทมชนิดนี้มากเกินไป ใช้ที่มีไปก่อนนะ!"
    default:
      return "มีข้อผิดพลาด กรุณาลองใหม่อีกครั้ง"
  };
};
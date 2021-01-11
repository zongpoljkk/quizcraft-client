import {useState} from "react";
import axios from "axios";

import backend from "../../ip"

export const useGetAllAchievements = (user_id) => {
    const [achievements_loading, set_achievements_loading] = useState(true);
    const [all_achievements, set_all_achievements] = useState();
    const [my_achievements, set_my_achievements] = useState();
  
    const getAllAchievements = async () => {
      try {
        const response = await axios.get(
          backend + "achievement/",
        //   {
        //     params: {
        //       userId: user_id,
        //     },
        //   }
        );
        const { success, data } = response.data;
        if (success) {
          set_all_achievements(data);
          set_achievements_loading(false);
        } else {
          console.log("getAllAchievements Error");
        }
      } catch (e) {
        console.log("There are something wrong about getAllAchievements :(");
      }
    };
    return { getAllAchievements, achievements_loading, all_achievements, my_achievements };
  };
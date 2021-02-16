import axios from "axios";
import backend from "../ip";

export const checkAchievement = async (user_id, type, streaks = null) => {
  try {
    const response = await axios.put(
      backend + "achievement/check-achievement/",
      {
        userId: user_id,
        streaks: streaks,
        type: type,
      }
    );
    const { success, data } = response.data;
    if (success) {
      console.log(data)
      return data;
    } else {
      console.log("checkAchievement Error");
    }
  } catch (error) {
    console.error(error);
    console.log("There are something wrong when checking for achievement :(");
  }
};

import axios from "axios";
import backend from "../ip";

export const checkStreaksAchievement = async (user_id, streaks, type) => {
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
      return data;
    } else {
      console.log("checkAchievement Error");
    }
  } catch (error) {
    console.error(error);
    console.log(
      "There are something wrong when checking for streak related achievement :("
    );
  }
};

export const checkReportAchievement = async (user_id, type) => {
  try {
    const response = await axios.put(
      backend + "achievement/check-achievement/",
      {
        userId: user_id,
        type: type,
      }
    );
    const { success, data } = response.data;
    if (success) {
      return data;
    } else {
      console.log("checkReport Error");
    }
  } catch (error) {
    console.error(error);
    console.log(
      "There are something wrong when checking for report related achievement :("
    );
  }
};

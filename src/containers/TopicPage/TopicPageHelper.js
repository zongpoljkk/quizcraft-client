import math_topic from "../../assets/thumbnail/math_topic.png";
import eng_topic from "../../assets/thumbnail/eng_topic.png";

export const mapImgWithTopic = (topic) => {
  switch (topic) {
    case "เลขยกกำลัง":
      return math_topic;
    case "แกรมมาร์":
      return eng_topic;

    default:
      return <div> no topic match </div>;
  }
};

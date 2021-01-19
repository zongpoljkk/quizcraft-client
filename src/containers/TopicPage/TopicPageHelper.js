import { useState } from "react";
import axios from "axios";

import backend from "../../ip";

export const useGetTopicName = (subject_name) => {
  const [loading, set_loading] = useState(true);
  const [topics, set_topics] = useState();

  const getTopicName = async () => {
    try {
      const response = await axios.get(backend + "subtopic/get-topics/", {
        params: {
          subject: subject_name,
        },
      });
      const { success, data } = response.data;
      if (success) {
        var topic_lists = [];
        data.map(
          (topic, index) =>
            (topic_lists[index] = {
              topic_name: topic._id,
              topic_image: topic.topicImg,
            })
        );
        set_topics(topic_lists);
        set_loading(false);
      } else {
        console.log("getTopicName Error");
      }
    } catch (e) {
      console.log("There are something wrong about get topic name :(");
    }
  };

  return { getTopicName, loading, topics };
};

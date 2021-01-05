import { useState } from "react";
import axios from "axios";

import backend from "../../ip";

export const useGetsubTopicName = (topic_name) => {
  const [loading, set_loading] = useState(true);
  const [subtopics, set_subtopics] = useState();

  const getSubtopicName = async () => {
    try {
      const response = await axios.get(backend + "subtopic/get-subtopics/", {
        params: {
          topic: topic_name
        }
      });
      const { success, data } = response.data;
      if (success) {
        var subtopic_lists = [];
        set_loading(false);
        data.map((subtopic, index) => (
          subtopic_lists[index] = {
            subtopic_id: subtopic._id,
            subtopic_name: subtopic.subtopicName,
            available_difficulty: subtopic.availableDifficulty
          }
        ))
        set_subtopics(subtopic_lists);
      } else {
        console.log("getSubtopicName Error");
      } 
    } catch (e) {
      console.log("There are something wrong about get subtopic name :(");
    }
  };

  return { getSubtopicName, loading, subtopics };
};
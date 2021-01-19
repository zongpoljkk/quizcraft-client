import React, { useState } from "react";
import axios from "axios";

import backend from "../../ip";

export const useGetAllSubjects = () => {
  const [subjects, set_subjects] = useState();

  const getAllSubjects = async () => {
    try {
      const response = await axios.get(backend + "subtopic/get-all-subjects");
      const { success, data } = response.data;
      if (success) {
        var all_subjects = [];
        for (let index = 0; index < data.length; index++) {
          all_subjects.push(data[index]._id);
        };
        set_subjects(all_subjects);
      } else {
        console.log("getAllSubjects Error");
      } 
    } catch (e) {
      console.log("There are something wrong about get all subjects :(");
    }
  };

  return { getAllSubjects, subjects };
};

export const useGetAllTopicsBySubjectName = () => {
  const [topics, set_topics] = useState();

  const getAllTopicsBySubjectName = async (subject_name) => {
    if (subject_name) {
      try {
        const response = await axios.get(backend + "subtopic/get-topics", {
          params: {
            subject : subject_name,
          }
        });
        const { success, data } = response.data;
        if (success) {
          var all_topics = [];
          for (let index = 0; index < data.length; index++) {
            all_topics.push(data[index]._id);
          };
          set_topics(all_topics);
        } else {
          console.log("getAllTopicsBySubjectName Error");
        } 
      } catch (e) {
        console.log("There are something wrong about get all topics by subject name :(");
      }
    };
  };

  return { getAllTopicsBySubjectName, topics };
};

export const useGetAllSubtopicsByTopicName = () => {
  const [subtopics, set_subtopics] = useState();

  const getAllSubtopicsByTopicName = async (topic_name) => {
    try {
      const response = await axios.get(backend + "subtopic/get-subtopics", {
        params: {
          topic : topic_name,
        }
      });
      const { success, data } = response.data;
      if (success) {
        var all_subtopics = [];
        for (let index = 0; index < data.length; index++) {
          all_subtopics.push(data[index].subtopicName);
        };
        set_subtopics(all_subtopics);
      } else {
        console.log("getAllSubtopicsBySubjectName Error");
      } 
    } catch (e) {
      console.log("There are something wrong about get all subtopics by topic name :(");
    }
  };

  return { getAllSubtopicsByTopicName, subtopics };
};

export const useGetAvailableDifficultyBySubtopicName = () => {
  const [available_difficulty, set_available_difficulty] = useState();

  const getAvailableDifficultyBySubtopicName = async (subtopic_name) => {
    try {
      const response = await axios.get(backend + "subtopic/get-available-difficulty", {
        params: {
          subtopicName : subtopic_name,
        }
      });
      const { success, data } = response.data;
      if (success) {
        var all_available_difficulty = [];
        for (let key in data) {
          if(data[key]) {
            all_available_difficulty.push(key.toLowerCase());
          };
        };
        set_available_difficulty(all_available_difficulty);
      } else {
        console.log("getAvailableDifficultyBySubtopicName Error");
      } 
    } catch (e) {
      console.log("There are something wrong about get all available difficulty by subtopic name :(");
    }
  };

  return { getAvailableDifficultyBySubtopicName, available_difficulty };
};
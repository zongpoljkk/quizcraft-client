import backend from "../../ip";
import axios from "axios";

export const getAndCheckAnswer = async (
  problemId,
  userId,
  userAnswer,
  userTime,
  topic,
  subtopic
) => {
  try {
    const url = `${backend}problem/get-and-check-answer`;
    const data = {
      problemId: problemId,
      userId: userId,
      userAnswer: userAnswer,
      userTime: userTime,
      topic: topic,
      subtopic: subtopic,
    };
    const options = {
      method: "POST",
      url: url,
      headers: { "content-type": "application/json" },
      data: JSON.stringify(data),
    };
    const response = await axios(options);
    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    console.error("Unable to get and check answer and update difficulty index");
  }
  return Promise.reject(new Error("getAndCheckAnswer"));
};

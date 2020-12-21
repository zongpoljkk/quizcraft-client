import backend from "../../ip";
import axios from "axios";

const requestHeader = {
  "content-type": "application/json",
  Authorization: `Bearer ${accessToken}`,
};

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
      headers: { requestHeader },
      data: JSON.stringify(data),
      //   headers: { "content-type": "application/json" },
      // headers: { "content-type": "application/x-www-form-urlencoded" },
      // params: params,
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

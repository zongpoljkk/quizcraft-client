import { useState, useEffect } from "react";
import axios from "axios";
import backend from "../ip";

export const convertHexToRGBA = (hexCode, opacity) => {
  let hex = hexCode.replace("#", "");

  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `rgba(${r},${g},${b},${opacity / 100})`;
};

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
};

export function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}

export const checkSolveProblemAchievement = async (user_id, subtopic) => {
  try {
    const response = await axios.get(
      backend + "achievement/check-achievement/",
      {
        params: {
          userId: user_id,
          subtopic: subtopic,
        },
      }
    );
    const { success, data } = response.data;
    if (success) {
      console.log(data);
    } else {
      console.log("checkAchievement Error");
    }
  } catch (error) {
    console.log("There are something wrong when checking for achievement :(");
  }
}

export const hasStringOrNumber = (myString) => {
  var regExp = /[a-zA-Z]/g;
  return /\d/.test(myString) || regExp.test(myString);
};

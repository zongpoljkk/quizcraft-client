import practice from "../assets/thumbnail/practice.png";
import quiz from "../assets/thumbnail/quiz.png";
import challenge from "../assets/thumbnail/challenge.png";
import level_easy from "../assets/thumbnail/level_easy.png";
import level_medium from "../assets/thumbnail/level_medium.png";
import level_hard from "../assets/thumbnail/level_hard.png";

export const COLOR = {
  MANDARIN: "#EF8354",
  ISLAND_SPICE: "#F5ECDF",
  GOLDEN_TAINOI: "#FBBE4B",
  WHITE: "#FFFFFF",
  BLACK: "#000000",
  CHARCOAL: "#4A4A4A",
  CELERY: "#A8C653",
  TRINIDAD: "#D24C2B",
  SILVER: "#BFC0C0",
  SHADOW: "#D9D9D9",
  SILVER_OPACITY_30: "#ECEDED",
  SHADOW: "#D9D9D9",
};

export const API_HOST = `http://localhost:5000`;

export const SIZE = {
  LARGE: "160px",
  SMALL: "97px",
};

export const MODE = {
  PRACTICE: {
    type: "ฝึกซ้อม",
    icon: practice,
  },
  QUIZ: {
    type: "ทดสอบ",
    icon: quiz,
  },
  CHALLENGE: {
    type: "ท้าทาย",
    icon: challenge,
  },
};

export const DIFFICULTY = {
  EASY: {
    type: "ง่าย",
    icon: level_easy,
  },
  MEDIUM: {
    type: "ปานกลาง",
    icon: level_medium,
  },
  HARD: {
    type: "ยาก",
    icon: level_hard,
  },
};

export const ANSWER_TYPE = {
  MATH_INPUT: "MATH_INPUT",
  SELECT_ONE: "SELECT_ONE",
  RADIO_CHOICE: "RADIO_CHOICE",
};

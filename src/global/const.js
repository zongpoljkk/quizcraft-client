import practice from "../assets/thumbnail/practice.png";
import quiz from "../assets/thumbnail/quiz.png";
import challenge from "../assets/thumbnail/challenge.png";
import level_easy from "../assets/thumbnail/level_easy.png";
import level_medium from "../assets/thumbnail/level_medium.png";
import level_hard from "../assets/thumbnail/level_hard.png";
import disable_easy from "../assets/thumbnail/disable_easy.png";
import disable_medium from "../assets/thumbnail/disable_medium.png";
import disable_hard from "../assets/thumbnail/disable_hard.png";

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
  SILVER_OPACITY_30: "#ECEDED",
  SHADOW: "#D9D9D9",
};

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
    type: "EASY",
    icon: level_easy,
    disable_icon: disable_easy
  },
  MEDIUM: {
    type: "MEDIUM",
    icon: level_medium,
    disable_icon: disable_medium
  },
  HARD: {
    type: "HARD",
    icon: level_hard,
    disable_icon: disable_hard
  }
};

export const ANSWER_TYPE = {
  MATH_INPUT: "MATH_INPUT",
  SELECT_ONE: "SELECT_ONE",
  RADIO_CHOICE: "RADIO_CHOICE",
};

export const LEADERBOARD_FILTER = {
  GLOBAL: "ทั่วโลก",
  SCHOOL: "โรงเรียน",
  CLASS: "ห้องเรียน",
};

export const RANK = {
  BRONZE: "BRONZE",
  SILVER: "SILVER",
  GOLD: "GOLD",
};

export const REPORT = {
  WRONG_DIFFICULTY: "โจทย์ระดับความยากไม่ถูกต้อง",
  NOT_CLEAR: "โจทย์คลุมเครือ",
  NO_ANSWER: "ไม่สามารถหาคำตอบได้",
  WRONG_ANSWER: "เฉลยคำตอบไม่ถูกต้อง",
  WRONG_SOLUTION: "เฉลยวิธีทำไม่ถูกต้อง",
  ETC: "อื่น ๆ",
};

export const LARGE_DEVICE_SIZE = 768;

export const CONTAINER_PADDING = 64;

export const WRONG_ANSWER = "jg9034jf0wjof0";

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

export const GAME_MODE = {
  PRACTICE: "PRACTICE",
  QUIZ: "QUIZ",
  CHALLENGE: "CHALLENGE",
  GROUP: "GROUP",
}

export const DIFFICULTY = {
  EASY: {
    type: "EASY",
    icon: level_easy,
    disable_icon: disable_easy,
  },
  MEDIUM: {
    type: "MEDIUM",
    icon: level_medium,
    disable_icon: disable_medium,
  },
  HARD: {
    type: "HARD",
    icon: level_hard,
    disable_icon: disable_hard,
  },
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

export const DEVICE_SIZE = {
  LARGE: 768,
  MEDIUM: 414,
  S: 380,
  XS: 360,
  XXS: 320,
  XXXS: 304
};

export const CONTAINER_PADDING = 64;

export const NAVBAR_HEIGHT = 54;

export const WRONG_ANSWER = {
  MATH: "1.2^[1.23]",
  MATH_BOX: "0.12345654321",
  STRING: "dasdasldgaso",
};

export const ITEM_NAME = {
  SKIP: "Skip",
  HINT: "Hint",
  DOUBLE: "Double",
  REFRESH: "Refresh",
  FREEZE: "Freeze"
};

export const QUOTE = [
  "เราทำในสิ่งที่ต้องทำเพื่อจะได้ทำในสิ่งที่อยากทำ",
  "จงพยายามเป็นคนที่เปี่ยมไปด้วยคุณค่า",
  "เราสามารถเติบโตได้เสมอ ตราบเท่าที่เรายังมีชีวิต",
  "จงตื่นขึ้นมาในทุกเช้าอย่างมีจุดหมาย หากว่าคุณอยากเข้านอนอย่างพึงพอใจ",
  "ประสบการณ์ คือครูที่โหดหินมากที่สุด แต่คุณก็ได้เรียนรู้จากมันจริงๆ",
  "ยิ่งข้าพเจ้าทำงานหนักเท่าไหร่ ก็ดูเหมือนว่าโชคจะเข้าข้างข้าพเจ้ามากขึ้นเท่านั้น",
  "สิ่งที่คุณควรทำตอนนี้คือ เริ่มลงมือทำ",
  "เรียนรู้จากวันวาน ใช้ชีวิตเพื่อปัจจุบัน มีความหวังสำหรับวันพรุ่งนี้",
  "ไม่มีผลงานชั้นยอดชิ้นใด ที่ถูกสร้างโดยศิลปินผู้เกียจคร้าน",
  "จงผลัดวันประกันพรุ่งแต่ในเรื่องที่คุณจะไม่เสียดาย หากว่าตายไปโดยไม่ได้ทำมัน",
];

export const TYPOGRAPHY = {
  HEADER: {
    font_weight: "600",
    font_size: "24"
  },
  SUBHEADER: {
    font_weight: "500",
    font_size: "20"
  },
  BODY: {
    font_weight: "400",
    font_size: "16"
  },
  OVERLINE: {
    font_weight: "400",
    font_size: "12"
  }
};

export const CHALLENGE_BOX_TYPE = {
  MY_TURN: "MY_TURN",
  CHALLENGER_TURN: "CHALLENGER_TURN",
  RESULT: "RESULT"
};

export const QUIZ_SKIP_LIMIT = 3;
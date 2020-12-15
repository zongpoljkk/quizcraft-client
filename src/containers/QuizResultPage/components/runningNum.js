import styled from "styled-components";
import { motion } from "framer-motion";

import { COLOR } from "../../../global/const";

const RunningNum = ({ isVisible, score }) => {
  return (
    <div>
      <RunningNumCss
        initial={{ scale: 0 }}
        animate={{ scale: 1.0 }}
        transition={{ duration: 0 }}
      >
        8
      </RunningNumCss>
    </div>
  );
};

const RunningNumCss = styled(motion.p)`
  font-size: 92px;
  font-weight: 400;
  font-family: Prompt, sans-serif;
  color: ${COLOR.MANDARIN};
`;

export default RunningNum;

// import styled from "styled-components";
// import { motion } from "framer-motion";

// import Correct from "../../../assets/icon/hint.png";
// import Incorrect from "../../../assets/icon/skip.png";

// const Sign = ({ isVisible, answer }) => {
//   let source;
//   if (answer === true) {
//     source = Correct;
//   } else {
//     source = Incorrect;
//   }
//   return (
//     <SignCss
//       src={source}
//       initial={{ scale: 0 }}
//       animate={{ scale: 1 }}
//       transition={{ duration: 0.3 }}
//     />
//   );
// };

// const SignCss = styled(motion.img)`
//   alt: "Sign";
//   height: 72px;
// `;

// export default Sign;

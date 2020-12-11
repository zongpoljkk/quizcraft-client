import { Line, Circle } from 'rc-progress';

import { COLOR } from "../global/const";

export const ProgressBar = ({
  type = "line",
  percent
}) => {

  return (
    type === "line" ?
    <Line 
      percent={percent}
      strokeWidth="3"
      strokeColor={COLOR.MANDARIN}
      trailWidth="3"
      trailColor={COLOR.SILVER_OPACITY_30}
    />
    : 
    <Circle 
      percent={percent}
      strokeWidth="3"
      strokeColor={COLOR.MANDARIN}
      trailWidth="3"
      trailColor={COLOR.SILVER_OPACITY_30}
    />
  );
};
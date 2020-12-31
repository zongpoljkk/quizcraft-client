const CHALLENGE_BOX_WIDTH_WITH_MARGIN_RIGHT = 118;
const CHALLENGE_BOX_WIDTH = 106;

export const getMarginRightOfChallengeBox = (container_width, set_margin_right, lenght) => {
  var marginRight = [];
  var challenges_box_width = 0;
  for (let index = 0; index < lenght; index++) {
    if(challenges_box_width + CHALLENGE_BOX_WIDTH_WITH_MARGIN_RIGHT <= container_width) {
      challenges_box_width = challenges_box_width+CHALLENGE_BOX_WIDTH_WITH_MARGIN_RIGHT;
      marginRight[index] = 12;
    }
    else if(challenges_box_width + CHALLENGE_BOX_WIDTH <= container_width) {
      challenges_box_width = challenges_box_width+CHALLENGE_BOX_WIDTH;
      marginRight[index] = 0;
    }
    else {
      challenges_box_width = CHALLENGE_BOX_WIDTH_WITH_MARGIN_RIGHT;
      marginRight[index] = 12;
    }
  };
  set_margin_right(marginRight);
};
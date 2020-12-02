const MIN_BOX_WIDTH = 32;
const WIDTH_PER_CHAR = 6;

export const makeAnswerBox = (correct_answer) => {
  var list = [];
  var current_type = "main";
  var last_type = "main";
  var lcount = 0;
  var list_id = 0;
  var skip = false;
  for (let index = 0; index < correct_answer.length; index++) {
    if (!skip) { 
      if (correct_answer.charAt(index) === "(") {
        list[list_id] = [last_type, lcount, last_type];
        list_id += 1;
        lcount = 0;
        current_type = "(";
        list[list_id] = [current_type, 1, last_type];
        list_id += 1;
        current_type = last_type;
      }
      else if (correct_answer.charAt(index) === ")") {
        list[list_id] = [last_type, lcount, last_type];
        list_id += 1;
        lcount = 0;
        current_type = ")";
        list[list_id] = [current_type, 1, last_type];
        list_id += 1;
        current_type = "main"; // after ")" type must be main
      }
      else if (correct_answer.charAt(index) === "^") {
        list[list_id] = [last_type, lcount, last_type];
        list_id += 1;
        lcount = 0;
        current_type = "power";
        if(correct_answer.charAt(index+1) !== "(") {
          list[list_id] = [current_type, 1, last_type];
          current_type = "main"; // if there is 1 power type must be back to main
          list_id += 1;
          skip = true;
        }
      }
      else {
        if(index === correct_answer.length - 1){
          list[list_id] = [current_type, lcount, last_type];
        }
        lcount += 1;
      }
    }
    else {
      skip = false;
    }
    last_type = current_type;
  }
  var boxes = [];
  var index = 0;
  list.map((item) => {
    if(item[1] !== 0) {
      boxes[index] = {
        type: item[0], 
        width: item[1] === 1 ? MIN_BOX_WIDTH : MIN_BOX_WIDTH + ((item[1] - 1) * WIDTH_PER_CHAR),
        last_type: item[2]
      };
      index = index + 1;
    }
  });
  return boxes;
};
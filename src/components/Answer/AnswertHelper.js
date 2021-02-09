const MIN_BOX_WIDTH = 32;
const WIDTH_PER_CHAR = 11;

export const mathAnswerBox = (correct_answer) => {
  var list = [];
  var current_type = "numerator";
  var last_type = "numerator";
  var after_power_type = "numerator";
  var start_index = 0;
  var end_index = 0;
  var current_index = 0;
  var list_index = 0;
  var skip = false;
  var text = '';
  for (let index = 0; index < correct_answer.length; index++) {
    if(correct_answer.charAt(index) === "{") {
      if(current_index !== index) {
        text = correct_answer.substring(start_index, end_index);
        list[list_index] = [text, text.length, current_type, last_type];
        list_index += 1;
      };
      last_type = current_type;
      current_type = "display";
      skip = true;
      start_index = index + 1;
      current_index = index + 1;
    }
    else if(correct_answer.charAt(index) === "}") {
      text = correct_answer.substring(start_index, index);
      list[list_index] = [text, text.length, current_type, last_type];
      list_index += 1;
      current_type = last_type;
      last_type = "display";
      skip = false;
      start_index = index + 1;
      end_index = index + 1;
      current_index = index + 1;
    }
    else if(correct_answer.charAt(index) === "(") {
      if(current_index !== index) {
        text = correct_answer.substring(start_index, end_index);
        list[list_index] = [text, text.length, current_type, last_type];
        list_index += 1;
      };
      last_type = current_type;
      list[list_index] = ["(", 1, "(", last_type];
      list_index += 1;
      skip = true;
      start_index = index + 1;
      current_index = index + 1;
    }
    else if(correct_answer.charAt(index) === ")") {
      text = correct_answer.substring(start_index, index);
      if(text.length !== 0) {
        list[list_index] = [text, text.length, current_type, last_type];
        list_index += 1;
      };
      list[list_index] = [")", 1, ")", last_type];
      list_index += 1;
      skip = false;
      start_index = index + 1;
      end_index = index + 1;
      current_index = index + 1;
    }
    else if(correct_answer.charAt(index) === "^") {
      if(current_index !== index) {
        text = correct_answer.substring(start_index, end_index);
        list[list_index] = [text, text.length, current_type, last_type];
        list_index += 1;
      };
      after_power_type = last_type;
      current_type = "power";
    }
    else if(correct_answer.charAt(index) === "[") {
      start_index = index + 1;
      end_index = index + 1;
      current_index = index + 1;
    }
    else if(correct_answer.charAt(index) === "]") {
      last_type = after_power_type;
      text = correct_answer.substring(start_index, index);
      list[list_index] = [text, text.length, current_type, last_type];
      list_index += 1;
      current_type = after_power_type;
      start_index = index + 1;
      end_index = index + 1;
      current_index = index + 1;
    }
    else if(correct_answer.charAt(index) === "/") {
      if(current_index !== index) {
        text = correct_answer.substring(start_index, end_index);
        list[list_index] = [text, text.length, current_type, last_type];
        list_index += 1;
      };
      list[list_index] = ["/", correct_answer.substring(0, index).length, "/", last_type];
      list_index += 1;
      last_type = current_type;
      current_type = "denumerator";
      start_index = index + 1;
      end_index = index + 1;
      current_index = index + 1;
    }
    else if(correct_answer.charAt(index) === "*" && current_type === "display") {
      if(current_index !== index) {
        text = correct_answer.substring(start_index, end_index);
        list[list_index] = [text, text.length, current_type, last_type];
        list_index += 1;
      };
      list[list_index] = ["*", 1, current_type, last_type];
      list_index += 1;
      start_index = index + 1;
      end_index = index + 1;
      current_index = index + 1;
    }
    else {
      if(!skip) {
        if(index == correct_answer.length-1) {
          text = correct_answer.substring(start_index, correct_answer.length);
          list[list_index] = [text, text.length, current_type, last_type];
        }
        else {
          end_index += 1;
        }
      }
    }
  };

  var boxes = [];
  var index = 0;
  list.map((item) => {
    if(item[1] !== 0) {
      boxes[index] = {
        text: item[0],
        width: item[1] === 1 ? MIN_BOX_WIDTH : MIN_BOX_WIDTH + ((item[1] - 1) * WIDTH_PER_CHAR),
        type: item[2],
        last_type: item[3]
      };
      index = index + 1;
    }
  });
  return boxes;
};

export const formatContent = (content) => {
  var content_with_type = [];
  var index_start = 0;
  var index_end = 1;
  var type = "content";
  var content_index = 0;
  for (let index = 0; index < content.length; index++) {
    if (content.charAt(index) === "[") {
      if (index !== 0) {
        content_with_type[content_index] = {
          type: type, 
          content: content.substring(index_start, index_end - 1)
        };
        content_index = content_index + 1;
      }
      type = "answer";
      index_start = index + 1;
    }
    else if (content.charAt(index) === "]") {
      content_with_type[content_index] = {
        type: type, 
        content: content.substring(index_start, index_end)
      };
      content_index = content_index + 1;
      type = "content";
      index_start = index + 1;
      index_end = content.length;
      content_with_type[content_index] = {
        type: type, 
        content: content.substring(index_start, index_end)
      };
      content_index = content_index + 1;
    }
    else if (content.charAt(index) === "&") {
      content_with_type[content_index] = {
        type: type, 
        content: content.substring(index_start, index_end)
      };
      content_index = content_index + 1;
      index_start = index + 1;
      index_end = index_end + 1;
    }
    else {
      index_end = index_end + 1;
    }
  }
  return content_with_type;
};

export const splitQuestion = (question) => {
  var splited_question = [];
  var index_start = 0;
  var index_end = 1;
  var type = "content";
  var question_index = 0;
  for (let index = 0; index < question.length; index++) {
    if (question.charAt(index) === "[") {
      if (index !== 0) {
        splited_question[question_index] = {
          type: type, 
          content: question.substring(index_start, index_end - 1)
        };
        question_index = question_index + 1;
      }
      type = "question";
      index_start = index + 1;
    }
    else if (question.charAt(index) === "]") {
      splited_question[question_index] = {
        type: type, 
        content: question.substring(index_start, index_end)
      };
      question_index = question_index + 1;
      type = "content";
      index_start = index + 1;
      index_end = question.length;
      splited_question[question_index] = {
        type: type, 
        content: question.substring(index_start, index_end)
      };
      question_index = question_index + 1;
    }
    else {
      index_end = index_end + 1;
    }
  }
  return splited_question;
};
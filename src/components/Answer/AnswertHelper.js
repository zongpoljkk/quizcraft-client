const MIN_BOX_WIDTH = 32;
const WIDTH_PER_CHAR = 6;

export const mathAnswerBox = (correct_answer) => {
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
        current_type = "main";
      }
      else if (correct_answer.charAt(index) === "^") {
        list[list_id] = [last_type, lcount, last_type];
        list_id += 1;
        lcount = 0;
        current_type = "power";
      }
      else if (correct_answer.charAt(index) === "]") {
        list[list_id] = [current_type, lcount, last_type];
        list_id += 1;
        lcount = 0;
        current_type = "main";
      }
      else if (current_type === "power") {
        if (correct_answer.charAt(index) !== "[") {
          lcount += 1;
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
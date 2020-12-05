import styled from "styled-components";
import practice from "../../../assets/thumbnail/practice.png";
import quiz from "../../../assets/thumbnail/quiz.png";
import challenge from "../../../assets/thumbnail/challenge.png";
import level_easy from "../../../assets/thumbnail/level_easy.png";
import level_medium from "../../../assets/thumbnail/level_medium.png";
import level_hard from "../../../assets/thumbnail/level_hard.png";
import { Subheader } from "../../../components/Typography";
import { COLOR } from "../../../global/const";

const ModeBox = () => {
  return (
    <Container>
      <Box>
        <Icon src={practice} />
        <Subheader props color={COLOR.WHITE}> ฝึกซ้อม </Subheader>
      </Box>
      <Box>
        <Icon src={quiz} />
        <Subheader props color={COLOR.WHITE}> ทดสอบ </Subheader>
      </Box>
      <DifficultyBox>
        <Icon src={level_easy} />
        <Icon src={level_medium} />
        <Icon src={level_hard} />
      </DifficultyBox>
      <LastModeBox>
        <Icon src={challenge} />
        <Subheader props color={COLOR.WHITE}> แข่งขัน </Subheader>
      </LastModeBox>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Box = styled.div`
display: flex;
padding: 12px 24px 12px 24px;
align-items: center;
background: ${COLOR.MANDARIN};
`;

const LastModeBox = styled.div`
display: flex;
padding: 12px 24px 12px 24px;
align-items: center;
background: ${COLOR.MANDARIN};
border-radius: 0px 0px 10px 10px;
`;

const DifficultyBox = styled.div`
display: flex;
padding: 12px 0px 12px 12px;
justify-content: flex-end;
align-items: center;
background: ${COLOR.GOLDEN_TAINOI};
`;

const Icon = styled.img`
  alt: "Mode icon";
  width: 40px;
  height: 40px;
  margin-right: 12px;
`;

export default ModeBox;

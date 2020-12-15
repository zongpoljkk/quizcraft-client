import { React, useState } from "react";
import styled from "styled-components";

// Typography
import { Header, Subheader, Body } from "../../components/Typography";

// Color
import { COLOR } from "../../global/const";

const QuizResultPage = () => {
  const [exp, setEXP] = useState(0);
  const [coin, setCoin] = useState(0);

  return (
    <Container>
      <CenterDiv style={{ marginBottom: "32px" }}>
        <Header>สรุปคะแนน</Header>
      </CenterDiv>

      <CenterDiv style={{ marginBottom: "64px" }}>
        <Circle>
          <Subheader color={COLOR.SILVER}>Out of 10</Subheader>
        </Circle>
      </CenterDiv>

      <CenterDiv>
        <Body color={COLOR.MANDARIN}>
          คุณได้รับ + {exp} XP + {coin} coins
        </Body>
      </CenterDiv>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const Circle = styled.span`
  height: 212px;
  width: 212px;
  background-color: ${COLOR.ISLAND_SPICE};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CenterDiv = styled.div.attrs((props) => ({
  marginBottom: props.marginBottom,
}))`
  display: flex;
  justify-content: center;
  margin-bottom: ${(props) => props.marginBottom};
`;

export default QuizResultPage;

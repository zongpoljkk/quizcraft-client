import React from "react";
import styled from "styled-components";

import { Subheader } from "./Typography";
import { DisplayText } from "./HandleText";

import { COLOR, CONTAINER_PADDING, TYPOGRAPHY } from "../global/const";
import { convertHexToRGBA, useWindowDimensions } from "../global/utils";

export const ProblemBox = ({
  problem = '',
  problem_content = '',
}) => {
  
  const { height: screen_height, width: screen_width } = useWindowDimensions();

  return (
    <ProblemContainer>
      <ProblemComponent>
        <Subheader>{problem}</Subheader>
        {problem_content ? (
          <Problem width={screen_width - CONTAINER_PADDING - 48}>
            <DisplayText
              fontWeight={TYPOGRAPHY.SUBHEADER.font_weight}
              fontSize={TYPOGRAPHY.SUBHEADER.font_size}
              content={problem_content}
            />
          </Problem>
        ) : null}
      </ProblemComponent>
    </ProblemContainer>
  );
};

const ProblemContainer = styled.div`
  background: ${COLOR.ISLAND_SPICE};
  border-radius: 10px;
  padding: 24px;
`;

const ProblemComponent = styled.div`
  display: flex;
  flex-direction: column;
`;

const Problem = styled.div.attrs(props => ({
  width: props.width
}))`
  max-width: ${props => props.width}px;
  margin-top: 16px;
  align-self: center;
  overflow-x: scroll;
  overflow-y: hidden;

  ::-webkit-scrollbar {
    -webkit-appearance: none;
    height: 3px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: ${convertHexToRGBA(COLOR.CHARCOAL, 40)};
  }
`;

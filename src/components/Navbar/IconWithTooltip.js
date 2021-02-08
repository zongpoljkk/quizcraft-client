import React from "react";
import styled from "styled-components";
import ReactTooltip from "react-tooltip";
import useSound from 'use-sound';

import { Body } from "../Typography";

import click from "../../assets/sounds/click.mp3";

import { COLOR } from "../../global/const";

export const IconWithTooltip = ({
  icon_src,
  tooltip_id,
  content_title,
  content
}) => {

  const [play] = useSound(click, { volume: 0.25 });

  return (
    <Container>
      <ToolTipIcon onClick={play} data-tip data-for={tooltip_id}>
        <Icon src={icon_src} marginRight={4} />
      </ToolTipIcon>
      <ReactTooltip
        id={tooltip_id}
        place="bottom"
        effect="solid"
        type="light"
        border
        borderColor={COLOR.ISLAND_SPICE}
      >
        <Body color={COLOR.MANDARIN}>{content_title} {content}</Body>
      </ReactTooltip>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-right: 4px;
`;

const Icon = styled.img`
  height: 28px;
  margin-right: ${props => props.marginRight}px;
`;

const ToolTipIcon = styled.div`
  display: flex;
`;
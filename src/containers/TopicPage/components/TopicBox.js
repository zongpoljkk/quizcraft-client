import { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import { ItemBox } from "../../../components/ItemBox";
import { Header } from "../../../components/Typography";
import default_topic from "../../../assets/thumbnail/default_topic.png";

const TopicBox = ({ 
  title,
  image,
  onClick 
}) => {

  return (
    <Container onClick={onClick}>
      <ItemBox>
        <TopicImg 
          src={image ? image : default_topic}
        />
        <Header>{title}</Header>
      </ItemBox>
    </Container>
  );
};

const Container = styled.div`
  margin-bottom: 32px;
  position: relative;
  top: 0px;

  &:hover {
    position: relative;
    top: -10px;
`;

const TopicImg = styled.img`
  alt: "Topic Image";
  width: 80px;
  height: 80px;
  margin-bottom: 7px;
`;
export default TopicBox;
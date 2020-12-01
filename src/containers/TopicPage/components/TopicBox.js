import { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { ItemBox } from "../../../components/ItemBox";
import { Header } from "../../../components/Typography";
import { mapImgWithTopic } from "../TopicPageHelper";
import TopicImg from "./TopicImage";

const TopicBox = () => {
  const [topic, setTopic] = useState("แกรมมาร์"); //แกรมมาร์, ยกกำลัง
  const history = useHistory();

  //TODO link to subtopic of clicked topic
  const handleClick = () => {
    history.push("/");
  };

  return (
    <Container onClick={handleClick}>
      <ItemBox>
        <TopicImg src={mapImgWithTopic(topic)} />
        <Header> {topic} </Header>
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
    top: 10px;
`;

export default TopicBox;

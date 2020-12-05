import { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import { ItemBox } from "../../../components/ItemBox";
import { Header } from "../../../components/Typography";
import default_topic from "../../../assets/thumbnail/default_topic.png";
import TopicImg from "./TopicImage";

const TopicBox = ({ image }) => {
  const [topic, set_topic] = useState("แกรมมาร์"); //แกรมมาร์, ยกกำลัง
  const history = useHistory();

  //TODO link to subtopic of clicked topic
  const handle_click = () => {
    history.push("/");
  };

  return (
    <Container onClick={handle_click}>
      <ItemBox>
        <TopicImg 
          src={image ? image : default_topic}
        />
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
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
    <div style = {{marginBottom: "32px"}} onClick={onClick}>
      <ItemBox>
        <TopicImg 
          src={image ? image : default_topic}
        />
        <Header>
          <CropText> {title} </CropText>
        </Header>
      </ItemBox>
    </div>
  );
};

const TopicImg = styled.img`
  alt: "Topic Image";
  width: 80px;
  height: 80px;
  margin-bottom: 4px;
`;

const CropText = styled.div`
  overflow: hidden; 
  white-space: nowrap; 
  text-overflow: ellipsis;
  text-align: center; 
  width: 126px; 
`;

export default TopicBox;
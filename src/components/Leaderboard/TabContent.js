import React, { useEffect, useRef } from "react";
import styled from "styled-components";

import { Body } from "../Typography";
import { COLOR } from "../../global/const";

export const TabContent = ({
  data,
  index
}) => {

  const useScroll = () => {
    const elRef = useRef(null);
    const executeScroll = () => elRef.current.scrollIntoView({ block: "center" });

    return [executeScroll, elRef];
  };

  const [executeScroll, elRef] = useScroll();
  useEffect(executeScroll, []);

  return (
    <Container>
      {Object.entries(data).map((user, i) => (
        <InfoBox
          key={i}
          backgroundColor={index - 1 === i ? COLOR.MANDARIN : null}
          ref={index - 1 === i ? elRef : null}
        >
          <OrderText>{i + 1}</OrderText>
          <UserImg backgroundColor={user[1].profileImage ? null : COLOR.ISLAND_SPICE}>
            {user[1].profileImage ? (
              <img
                style={{ width: "40px", height: "40px", borderRadius: "50%" }}
                src={"data:image/png;base64," + user[1].profileImage.data}
              />
            ) : null}
          </UserImg>
          <Body>{user[1].username}</Body>
          <LevelText color={index - 1 === i ? COLOR.ISLAND_SPICE : COLOR.GOLDEN_TAINOI}>
            Lv.{user[1].level}
          </LevelText>
        </InfoBox>
      ))}
    </Container>
  );
};


const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding-top: 16px;
  height: 168px;
  overflow: scroll;
`;

const InfoBox = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  padding: 4px 16px 4px 16px;
  min-height: 40px;
  background-color: ${props => props.backgroundColor};
`;

const OrderText = styled(Body)`
  display: flex;
  width: 24px;
`;

const LevelText = styled(Body)`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  color: ${props => props.color};
`;

const UserImg = styled.div.attrs(props => ({
  backgroundColor: props.backgroundColor
}))`
  alt: "User profile Image";
  background-color: ${props => props.backgroundColor};
  height: 40px;
  width: 40px;
  border-radius: 50%;
  text-align: center;
  margin-left: 12px;
  margin-right: 12px;
`;
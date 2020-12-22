import React from "react";
import styled from "styled-components";

import { HintItem } from "../../../components/HintItem";
import { ItemCard } from "../../../components/ItemCard";
import { LottieFile } from "../../../components/LottieFile";

import skip_icon from "../../../assets/icon/skip.png";
import skip_data from "../../../assets/lottie/skip.json";
import refresh_icon from "../../../assets/icon/refresh.png";
import refresh_data from "../../../assets/lottie/refresh.json";

import { COLOR } from "../../../global/const"

const ITEM_USAGE = {
  UN_USE: "UN_USE",
  IN_USE: "IN_USE",
  USED: "USED",
}

export const HeadlineItem = ({
  onGetHint,
  hintContent,
  skip,
  onSkip,
  refresh,
  onRefresh,
  children
}) => {

  return (
    <ItemHeadline>
      <HintItem onGetHint={onGetHint} content={hintContent}/>
      <ItemCard>
        {skip === ITEM_USAGE.UN_USE && (
          <CenterContainer onClick={onSkip}>
            <img src={skip_icon} height={22}/>
          </CenterContainer>
        )}
        {skip === ITEM_USAGE.IN_USE && (
          <SkipContainer>
            <ZoomItem>
              <LottieFile animationData={skip_data} loop={false} height={64}/>
            </ZoomItem>
          </SkipContainer>
        )}
        {skip === ITEM_USAGE.USED && (
          <CenterContainer>
            <img src={skip_icon} height={22}/>
            <DisableItem />
          </CenterContainer>
        )}
      </ItemCard>
      <ItemCard>
        {refresh === ITEM_USAGE.UN_USE && (
          <CenterContainer onClick={onRefresh}>
            <img src={refresh_icon} height={22}/>
          </CenterContainer>
        )}
        {refresh === ITEM_USAGE.IN_USE && 
          <LottieFile animationData={refresh_data} loop={false} height={48}/>
        }
        {refresh === ITEM_USAGE.USED && (
          <CenterContainer>
            <img src={refresh_icon} height={22}/>
            <DisableItem />
          </CenterContainer>
        )}
      </ItemCard>
      {children}
    </ItemHeadline>
  );
};

const ItemHeadline = styled.div`
  display: flex;
  flex: 1,
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 32px;
`;

const CenterContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const SkipContainer = styled.div`
  margin-left: -18px;
  transform: rotate(90deg);
`;

const ZoomItem = styled.div`
  transform: scale(1.7);
`;

const DisableItem = styled.div`
  display: flex;
  background-color: ${COLOR.BLACK};
  opacity: 0.3;
  height: 32px;
  width: 56px;
  border-radius: 4px;
  position: absolute;
  margin-top: -5px;
`;
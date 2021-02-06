import React from "react";
import styled from "styled-components";

import { HintItem } from "../../../components/HintItem";
import { ItemCard } from "../../../components/ItemCard";
import { LottieFile } from "../../../components/LottieFile";
import { Subheader } from "../../../components/Typography";

import skip_icon from "../../../assets/icon/skip.png";
import skip_data from "../../../assets/lottie/skip.json";
import refresh_icon from "../../../assets/icon/refresh.png";
import refresh_data from "../../../assets/lottie/refresh.json";

const ITEM_USAGE = {
  UN_USE: "UN_USE",
  IN_USE: "IN_USE",
  USED: "USED",
}

export const HeadlineItem = ({
  onGetHint,
  hintContent,
  have_hint,
  skip,
  onSkip,
  refresh,
  onRefresh,
  amount_of_hints,
  amount_of_skips,
  amount_of_refreshs,
  getNewAmount,
  children
}) => {

  return (
    <ItemHeadline onChange={getNewAmount()}>
      <HintItem amount_of_hints={amount_of_hints} onGetHint={onGetHint} content={hintContent} have_hint={have_hint}/>
      <ItemCard disable={(amount_of_skips === 0 || skip === ITEM_USAGE.USED) ? true : false}>
        {skip === ITEM_USAGE.UN_USE && (
          <CenterContainer onClick={amount_of_skips === 0 ? null : onSkip}>
            <ItemIcon src={skip_icon}/>
            <Subheader>{amount_of_skips}</Subheader>
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
            <ItemIcon src={skip_icon}/>
            <Subheader>{amount_of_skips}</Subheader>
          </CenterContainer>
        )}
      </ItemCard>
      <ItemCard disable={(amount_of_refreshs === 0 || refresh === ITEM_USAGE.USED)? true : false}>
        {refresh === ITEM_USAGE.UN_USE && (
          <CenterContainer onClick={amount_of_refreshs === 0 ? null : onRefresh}>
            <ItemIcon src={refresh_icon} marginRight={8}/>
            <Subheader>{amount_of_refreshs}</Subheader>
          </CenterContainer>
        )}
        {refresh === ITEM_USAGE.IN_USE && 
          <LottieFile animationData={refresh_data} loop={false} height={48}/>
        }
        {refresh === ITEM_USAGE.USED && (
          <CenterContainer>
            <ItemIcon src={refresh_icon} marginRight={8}/>
            <Subheader>{amount_of_refreshs}</Subheader>
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
  line-height: 22px;
`;

const ItemIcon = styled.img.attrs(props => ({
  marginRight: props.marginRight || 4
}))`
  height: 22px;
  margin-right: ${props => props.marginRight}px;
`;

const SkipContainer = styled.div`
  margin-left: -18px;
  transform: rotate(90deg);
`;

const ZoomItem = styled.div`
  transform: scale(1.7);
`;
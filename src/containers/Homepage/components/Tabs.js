import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { Pager } from "./Pager";
import { useMeasure } from "./TabHelper";
import { COLOR, LEADERBOARD_FILTER } from "../../../global/const";

import { TabContent } from "./TabContent";

export const Tabs = ({data}) => {
  const [value, setValue] = useState(0);
  const childRefs = useRef(new Map());
  const tabListRef = useRef();
  const [slider, setSlider] = useState({ left: 0, right: 0 });
  const { bounds, ref } = useMeasure();

  useEffect(() => {
    const target = childRefs.current.get(value);
    const container = tabListRef.current;
    if (target) {
      const cRect = container.getBoundingClientRect();

      if (cRect.width === 0) {
        return;
      }

      const tRect = target.getBoundingClientRect();
      const left = tRect.left - cRect.left;
      const right = cRect.right - tRect.right;

      setSlider({
        hasValue: true,
        left: left,
        right: right
      });
    }
  }, [value, bounds]);

  return (
    <Container>
       <TabContainer ref={ref}>
        <TabList ref={tabListRef}>
          {Object.entries(LEADERBOARD_FILTER).map((tab, i) => (
            <TabItem
              key={tab[0]}
              isActive={i === value}
              whileHover={{ backgroundColor: COLOR.WHITE }}
              transition={{ duration: 0.1 }}
              ref={el => childRefs.current.set(i, el)}
              onClick={() => setValue(i)}
            >
              {tab[1]}
            </TabItem>
          ))}
          {slider.hasValue && (
            <Slider
              positionTransition={{
                bounceDamping: 3
              }}
              initial={false}
              style={{
                left: slider.left,
                right: slider.right
              }}
            />
          )}
          <Underline />
        </TabList>
      </TabContainer>
      <Pager value={value}>
        {Object.entries(LEADERBOARD_FILTER).map((tab, index) => (
          <div key={tab[1]}>
            {tab[1]}
            <TabContent data={data[Object.keys(data)[index]]} index={data[Object.keys(data)[index+3]]}/>
          </div>
        ))}
      </Pager>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  flex-direction: column;
`;

const TabContainer = styled.div`
  display: flex;
  box-shadow: none;
`;

const TabList = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  position: relative;
`;

const TabItem = styled(motion.button).attrs(props => ({
  isActive: props.isActive
}))`
  display: flex;
  flex: 1;
  justify-content: center;
  text-align: center;
  text-rendering: optimizelegibility;
  outline: none;
  cursor: pointer;
  border-style: none;
  padding-top: 12px;
  padding-bottom: 12px;
  font-family: Prompt;
  font-size: 20px;
  font-weight: 500;
  color: ${props => (props.isActive ? COLOR.MANDARIN : COLOR.ISLAND_SPICE)};
  background: ${COLOR.WHITE};
`;

const Slider = styled(motion.div)`
  height: 4px;
  bottom: 0;
  position: absolute;
  background: ${COLOR.MANDARIN};
  z-index: 1;
`;

const Underline = styled.div`
  height: 4px;
  width: 100%;
  bottom: 0;
  position: absolute;
  background: ${COLOR.ISLAND_SPICE};
  z-index: 0;
`;
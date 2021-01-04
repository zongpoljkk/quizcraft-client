import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

export function Pager({ children, value }) {
  return (
    <PagerContainer>
      <PagerAnimtedContainer
        transition={{
          tension: 190,
          friction: 70,
          mass: 0.4
        }}
        initial={false}
        animate={{ x: value * -100 + "%" }}
      >
        {React.Children.map(children, (child, i) => (
          <Page
            key={i}
            aria-hidden={value !== i}
            tabIndex={value === i ? 0 : -1}
          >
            {child}
          </Page>
        ))}
      </PagerAnimtedContainer>
    </PagerContainer>
  );
}

const PagerContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow: hidden;
`;

const PagerAnimtedContainer = styled(motion.div)`
  display: flex;
  flex: 1;
  flex-direction: row;
  direction: ltr;
  will-change: transform;
  min-height: 0;
`;

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  width: 100%;
  flex-shrink: 0;
  outline: none;
`;

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { LottieFile } from "../../components/LottieFile";

import { Header, Subheader, Overline, Body } from "../../components/Typography";
import { COLOR } from "../../global/const";
import { convertHexToRGBA, useWindowDimensions } from "../../global/utils";

import LoadingPage from "../LoadingPage/LoadingPage";
import { useGetAllItems } from "./ShopPageHelper";

const Shop = () => {
  const ANIMATIONS = {
    rest: 1,
    hover: 1.1,
    pressed: 0.9,
  };

  const [animation, set_animation] = useState(ANIMATIONS.rest);
  const [in_used, set_in_used] = useState({
    คำใบ้: false,
    รีเฟรช: false,
    ข้าม: false,
    ดับเบิ้ล: false,
    หยุดเวลา: false,
  });
  const { height: screen_height, width: screen_width } = useWindowDimensions();
  const COLUMNS = Math.floor((screen_width-112)/132);
  const GAP = Math.floor((screen_width-(132*COLUMNS)-112)/COLUMNS);

  const { getAllItems, loading, items } = useGetAllItems();

  const handleItemClick = (item) => {
    // TODO: Buy item logic
    console.log(item);
  };

  useEffect(() => {
    getAllItems();
  }, []);

  return (
    <React.Fragment>
      {loading ? (
        <LoadingPage />
      ) : (
        <Container>
          <HeaderContainer>
            <Header>ร้านค้า</Header>
          </HeaderContainer>
          <ShopContainer columns={COLUMNS} gap={GAP}>
            {items.map((item, index) => {
              return (
                <ItemContainer
                  key={index}
                  onMouseOver={() => {
                    if (item.item_name !== "ไอเทม") {
                      set_animation(ANIMATIONS.hover);
                      set_in_used({
                        ...in_used,
                        [item.item_name]: true,
                      });
                    }
                  }}
                  onMouseLeave={() => {
                    set_animation(ANIMATIONS.rest);
                    set_in_used({ ...in_used, [item.item_name]: false });
                  }}
                  onMouseDown={() => {
                    set_animation(ANIMATIONS.pressed);
                  }}
                  onMouseUp={() => {
                    set_animation(ANIMATIONS.hover);
                  }}
                  onClick={
                    item.item_name !== "ไอเทม"
                      ? () => handleItemClick(item.item_name)
                      : () => {}
                  }
                  style={{
                    opacity: item.item_name === "ไอเทม" ? 0.3 : 1,
                  }}
                >
                  <Item>
                    {in_used[item.item_name] ? (
                      <LottieFile
                        animationData={JSON.parse(atob(item.animation_data))}
                        loop={false}
                        height={100}
                      />
                    ) : (
                      <ItemImg src= {"data:image/png;base64,"+item.src} />
                    )}
                  </Item>
                  <div style={{ margin: "8px auto", lineHeight: "24px" }}>
                    <Subheader>{item.item_name}</Subheader>
                  </div>
                  <div
                    style={{
                      margin: "8px auto",
                      textAlign: "center",
                      height: "96px",
                    }}
                  >
                    <Overline>{item.item_description}</Overline>
                  </div>
                  <div
                    style={{
                      marginTop: "16px",
                      lineHeight: "20px",
                      display: "flex",
                    }}
                  >
                    <Body color={COLOR.CELERY}>{item.price} </Body>
                    <Body>&nbsp;เหรียญ</Body>
                  </div>
                </ItemContainer>
              );
            })}
          </ShopContainer>
        </Container>
      )}
    </React.Fragment>
  );
};

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  margin-bottom: 32px;
`;

const ShopContainer  = styled.div.attrs(props => ({
  columns: props.columns,
  gap: props.gap
}))`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(${props => props.columns}, 1fr);
  grid-column-gap: ${props => props.gap}px;
  grid-row-gap: 24px;
  align-items: center;
  justify-items: center;
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  width: 100px;
  justify-content: center;
  align-items: center;
  background-color: ${convertHexToRGBA(COLOR.ISLAND_SPICE, 20)};
`;

const ItemImg = styled.img`
  max-height: 80px;
  max-width: 80px;
`;
const Item = styled(motion.div)`
  display: flex;
  height: 80px;
  align-items: center;
  margin-bottom: 12px;
`;

export default Shop;

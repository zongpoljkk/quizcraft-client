import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { LottieFile } from "../../components/LottieFile";

// Global
import { Header, Subheader, Overline, Body } from "../../components/Typography";
import { COLOR } from "../../global/const";
import { convertHexToRGBA } from "../../global/utils";

// Images
import lightbulb from "../../assets/thumbnail/lightbulb.png";
import freeze from "../../assets/thumbnail/freeze.png";
import double from "../../assets/thumbnail/double.png";
import skip from "../../assets/thumbnail/skip.png";
import refresh from "../../assets/thumbnail/refresh.png";
import blank from "../../assets/thumbnail/blank.png";

// Lottie
import hint_data from "../../assets/lottie/hint.json";
import refresh_data from "../../assets/lottie/refresh.json";
import skip_data from "../../assets/lottie/skip.json";
import double_data from "../../assets/lottie/double.json";
import freeze_data from "../../assets/lottie/freeze.json";

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
          <ShopContainer>
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
                  <Item style={{ height: "80px" }}>
                    {in_used[item.item_name] ? (
                      <LottieFile
                        animationData={item.animation_data}
                        loop={false}
                        height={100}
                      />
                    ) : (
                      <ItemImg src={item.src} />
                    )}
                  </Item>
                  <div style={{ margin: "8px auto", lineHeight: "24px" }}>
                    <Subheader>{item.item_name}</Subheader>
                  </div>
                  <div
                    style={{
                      margin: "8px auto",
                      padding: "0px 20px",
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

const ShopContainer = styled.div`
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px 0px;
  margin-bottom: 32px;
  margin-left: 8px;
  margin-right: 8px;
  background-color: ${convertHexToRGBA(COLOR.ISLAND_SPICE, 20)};
  @media screen and (min-width: 411px) {
    flex: 1 1 25%;
  }
  @media screen and (min-width: 301px) and (max-width: 410px) {
    flex: 1 1 35%;
  }
  @media screen and (max-width: 300px) {
    flex: 1 1 50%;
  }
`;

const ItemImg = styled.img`
  height: 80px;
`;
const Item = styled(motion.div)`
  margin-bottom: 12px;
`;

export default Shop;

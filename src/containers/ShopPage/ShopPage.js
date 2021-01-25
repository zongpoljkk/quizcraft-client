import React, { useState } from "react";
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
  const items_properties = [
    {
      src: lightbulb,
      animation_data: hint_data,
      item_name: "คำใบ้",
      item_description: "แสดงคำใบ้สำหรับโจทย์ข้อนั้นๆ",
      price: 50,
    },
    {
      src: refresh,
      animation_data: refresh_data,
      item_name: "รีเฟรช",
      item_description: "เปลี่ยนโจทย์ใหม่",
      price: 70,
    },
    {
      src: skip,
      animation_data: skip_data,
      item_name: "ข้าม",
      item_description: "ข้ามโจทย์ข้อนี้โดยที่ถือว่าทำถูกไปเลย",
      price: 100,
    },
    {
      src: double,
      animation_data: double_data,
      item_name: "ดับเบิ้ล",
      item_description:
        "เมื่อกดใช้จะได้ค่าประสบการณ์เป็นสองเท่าเป็นเวลา 24 ชั่วโมง",
      price: 300,
    },
    {
      src: freeze,
      animation_data: freeze_data,
      item_name: "หยุดเวลา",
      item_description: "เมื่อกดใช้จะค้าง streak ไว้ 1 วัน",
      price: 300,
    },
    {
      src: blank,
      item_name: "ไอเทม",
      item_description: "Coming Soon...",
      price: "???",
    },
  ];

  const handleItemClick = (item_properties) => {
    // TODO: Buy item logic
    console.log(item_properties.item_name);
  };

  return (
    <Container>
      <HeaderContainer>
        <Header>ร้านค้า</Header>
      </HeaderContainer>
      <ShopContainer>
        {items_properties.map((item_properties) => {
          return (
            <ItemContainer
              key={item_properties.item_name}
              onMouseOver={() => {
                if (item_properties.item_name !== "ไอเทม") {
                  set_animation(ANIMATIONS.hover);
                  set_in_used({
                    ...in_used,
                    [item_properties.item_name]: true,
                  });
                }
              }}
              onMouseLeave={() => {
                set_animation(ANIMATIONS.rest);
                set_in_used({ ...in_used, [item_properties.item_name]: false });
              }}
              onMouseDown={() => {
                set_animation(ANIMATIONS.pressed);
              }}
              onMouseUp={() => {
                set_animation(ANIMATIONS.hover);
              }}
              onClick={
                item_properties.item_name !== "ไอเทม"
                  ? () => handleItemClick(item_properties)
                  : () => {}
              }
              style={{
                opacity: item_properties.item_name === "ไอเทม" ? 0.3 : 1,
              }}
            >
              <Item style={{ height: "80px" }}>
                {in_used[item_properties.item_name] ? (
                  <LottieFile
                    animationData={item_properties.animation_data}
                    loop={false}
                    height={100}
                  />
                ) : (
                  <ItemImg src={item_properties.src} />
                )}
              </Item>
              <div style={{ margin: "8px auto", lineHeight: "24px" }}>
                <Subheader>{item_properties.item_name}</Subheader>
              </div>
              <div
                style={{
                  margin: "8px auto",
                  padding: "0px 20px",
                  textAlign: "center",
                  height: "96px",
                }}
              >
                <Overline>{item_properties.item_description}</Overline>
              </div>
              <div
                style={{
                  marginTop: "16px",
                  lineHeight: "20px",
                  display: "flex",
                }}
              >
                <Body color={COLOR.CELERY}>{item_properties.price} </Body>
                <Body>&nbsp;เหรียญ</Body>
              </div>
            </ItemContainer>
          );
        })}
      </ShopContainer>
    </Container>
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

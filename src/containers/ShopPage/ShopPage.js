import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

// Global
import { Header, Subheader, Overline, Body } from "../../components/Typography";
import { COLOR } from "../../global/const";
import { convertHexToRGBA } from "../../global/utils";

// Images
import lightbulb from "../../assets/lightbulb.png";
import freeze from "../../assets/freeze.png";
import double from "../../assets/double.png";
import skip from "../../assets/skip.png";
import refresh from "../../assets/refresh.png";
import blank from "../../assets/blank.png";

const Shop = () => {
  const ANIMATIONS = {
    rest: 1,
    hover: 1.1,
    pressed: 0.95,
  };

  const [current_item, set_current_item] = useState("");
  const [animation, set_animation] = useState(ANIMATIONS.rest);
  const items_properties = [
    {
      src: lightbulb,
      item_name: "คำใบ้",
      item_description: "Item description",
      price: 50,
    },
    {
      src: refresh,
      item_name: "รีเฟรช",
      item_description: "Item description",
      price: 70,
    },
    {
      src: skip,
      item_name: "ข้าม",
      item_description: "Item description",
      price: 100,
    },
    {
      src: double,
      item_name: "ดับเบิ้ล",
      item_description: "Item description",
      price: 300,
    },
    {
      src: freeze,
      item_name: "หยุดเวลา",
      item_description: "Item description",
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
                set_current_item(item_properties.item_name);
                set_animation(ANIMATIONS.hover);
              }}
              onMouseLeave={() => {
                set_animation(ANIMATIONS.rest);
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
              <Item
                src={item_properties.src}
                animate={{
                  scale:
                    item_properties.item_name === current_item &&
                    current_item !== "ไอเทม"
                      ? animation
                      : 1,
                }}
              ></Item>
              <div style={{ margin: "8px auto", lineHeight: "24px" }}>
                <Subheader>{item_properties.item_name}</Subheader>
              </div>
              <div style={{ lineHeight: "32px" }}>
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
  margin-top: 32px;
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
  flex: 1 1 25%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 32px;
  margin-left: 8px;
  margin-right: 8px;
  background-color: ${convertHexToRGBA(COLOR.ISLAND_SPICE, 20)};
`;

const Item = styled(motion.img)`
  width: 80px;
`;

export default Shop;

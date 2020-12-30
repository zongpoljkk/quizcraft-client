import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

// Global
import { Header, Subheader, Overline, Body } from "../../components/Typography";
import { COLOR } from "../../global/const";

// Images
import lightbulb from "../../assets/lightbulb.png";
import freeze from "../../assets/freeze.png";
import double from "../../assets/double.png";
import skip from "../../assets/skip.png";
import refresh from "../../assets/refresh.png";

const Shop = () => {
  const items_properties = [
    {
      src: lightbulb,
      item_name: "Hint",
      item_description: "Item description",
      price: 50,
    },
    {
      src: refresh,
      item_name: "Refresh",
      item_description: "Item description",
      price: 70,
    },
    {
      src: skip,
      item_name: "Skip",
      item_description: "Item description",
      price: 100,
    },
    {
      src: freeze,
      item_name: "Freeze",
      item_description: "Item description",
      price: 300,
    },
    {
      src: double,
      item_name: "Double",
      item_description: "Item description",
      price: 300,
    },
  ];

  return (
    <Container>
      <HeaderContainer>
        <Header>ร้านค้า</Header>
      </HeaderContainer>
      <ShopContainer>
        {/* <Item src={lightbulb}></Item> */}
        {items_properties.map((item_properties) => {
          return (
            <ItemContainer key={item_properties.item_name}>
              <Item src={item_properties.src}></Item>
              <Subheader>{item_properties.item_name}</Subheader>
              <Overline>{item_properties.item_description}</Overline>
              <Body>{item_properties.price} เหรียญ</Body>
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
  flex: 1 1 30%;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  background-color: ${COLOR.ISLAND_SPICE};
`;

const Item = styled(motion.img)`
  width: 80px;
`;

export default Shop;

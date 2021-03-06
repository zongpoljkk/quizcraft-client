import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import useSound from 'use-sound';

import { Header, Subheader, Overline, Body } from "../../components/Typography";
import { LottieFile } from "../../components/LottieFile";
import { ConfirmModal } from "../../components/ConfirmModal";
import { ConfirmResultModal } from "../../components/ConfirmResultModal";
import LoadingPage from "../LoadingPage/LoadingPage";
import useModal from "../../components/useModal";

import { COLOR, DEVICE_SIZE } from "../../global/const";
import { convertHexToRGBA, useWindowDimensions } from "../../global/utils";

import click from "../../assets/sounds/click.mp3";

import { useGetAllItems, useBuyItem } from "./ShopPageHelper";

const Shop = ({ history }) => {
  const user_id = localStorage.getItem("userId");

  const [lottie_display, set_lottie_display] = useState({});
  const [clicked_item, set_clicked_item] = useState();
  
  const { height: screen_height, width: screen_width } = useWindowDimensions();
  const COLUMNS = Math.floor((screen_width-112)/132);
  const GAP = Math.floor((screen_width-(132*COLUMNS)-112)/COLUMNS);
  
  const [isShowing, toggle] = useModal();
  const [isShowingResult, toggleResult] = useModal();
  
  const { getAllItems, loading, items } = useGetAllItems();
  const { buyItem, buy_success, buy_error_msg } = useBuyItem(user_id, clicked_item);

  const [play] = useSound(click, { volume: 0.25 });

  const handleOnMouseEnter = (item) => {
    set_lottie_display((lottie_display) => {
      return {
        ...lottie_display,
        [item]: true,
      };
    });
  };

  const handleOnMouseLeave = (item) => {
    set_lottie_display((lottie_display) => {
      return {
        ...lottie_display,
        [item]: false,
      };
    });
  };
  
  const handleItemClick = (item) => {
    toggle();
    set_clicked_item(item);
    play();
  };

  const onConfirmModalSubmit = async () => {
    await buyItem(user_id, clicked_item);
    await toggleResult();
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
          <ShopContainer columns={COLUMNS < 5 ? COLUMNS : 5} gap={GAP}>
            {items.map((item, index) => {
              return (
                <ItemContainer
                  key={index}
                  onMouseEnter={() => screen_width > DEVICE_SIZE.LARGE ? handleOnMouseEnter(item.item_name) : null}
                  onMouseLeave={() => screen_width > DEVICE_SIZE.LARGE ? handleOnMouseLeave(item.item_name) : null}
                  onClick={() => 
                    handleItemClick(item.item_name)
                  }
                >
                  <Item>
                    {item.item_name === "Skip" &&
                      (lottie_display.Skip ? (
                        <ZoomItem isItemSkip={true}>
                          <LottieFile
                            animationData={JSON.parse(atob(item.animation_data))}
                            loop={false}
                            height={64}
                            width={64}
                          />
                        </ZoomItem>
                      ) : (
                        <ItemImg src={"data:image/png;base64," + item.src} />
                      ))}
                    {item.item_name === "Double" &&
                      (lottie_display.Double ? (
                        <ZoomItem>
                          <LottieFile
                            animationData={JSON.parse(atob(item.animation_data))}
                            loop={false}
                            height={64}
                          />
                        </ZoomItem>
                      ) : (
                        <ItemImg src={"data:image/png;base64," + item.src} />
                      ))}
                    {item.item_name !== "Skip" &&
                      item.item_name !== "Double" &&
                      (lottie_display[item.item_name] ? (
                        <LottieFile
                          animationData={JSON.parse(atob(item.animation_data))}
                          loop={false}
                          height={100}
                        />
                      ) : (
                        <ItemImg src={"data:image/png;base64," + item.src} />
                      ))}
                  </Item>
                  <div
                    style={{
                      margin: "8px auto",
                      lineHeight: "24px",
                    }}
                  >
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
            <ConfirmModal
              isShowing={isShowing}
              toggle={toggle}
              content="คุณยืนยันที่จะซื้อไอเทมนี้ใช่หรือไม่" 
              onSubmit={() => onConfirmModalSubmit()} 
            />
            <ConfirmResultModal 
              isShowing={isShowingResult}
              toggle={toggleResult}
              success={buy_success}
              success_description="การซื้อไอเทมสำเร็จ สามารถตรวจสอบไอเทมที่มีได้ที่โปรไฟล์ของคุณ"
              fail_description={buy_error_msg}
              onSubmit={() => {
                if(buy_success){
                  history.push("/profile");
                  history.go(0);
                }
              }}
            />
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
  cursor: pointer;
  background-color: ${convertHexToRGBA(COLOR.ISLAND_SPICE, 20)};
  position: relative;
  overflow: hidden;
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

const ZoomItem = styled.div.attrs((props) => ({
  isItemSkip: props.isItemSkip,
}))`
  width: 100px;
  position: absolute;
  z-index: 1;
  zoom: 300%;
  ${(props) =>
    props.isItemSkip
      ? `
      margin-left: -55px;
      transform: rotate(90deg);
    `
      : `
      margin-left: -50px;
    `}
`;

export default withRouter(Shop);

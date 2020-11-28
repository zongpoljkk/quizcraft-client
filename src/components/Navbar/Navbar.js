import React from "react";
import styled from "styled-components";

// Media
import main_logo from "../../assets/logo.png";
import bronze_medal from "../../assets/bronze.png";

// Color
import { MANDARIN } from "../../global/const";

const Navbar = () => {
  const Navbar = styled.div`
    /* display: inline-block; */
    background-color: ${MANDARIN};
    width: 100%;
    height: 65px;
    padding: 0;
    margin: 0;
  `;

  const AppLogo = styled.img`
    alt: "Quizcraft Logo";
    height: 65px;
    margin-left: 10px;
  `;

  const BronzeMedal = styled.img`
    alt: "Bronze Medal";
    height: 65px;
    /* margin-left: 10px; */
  `;

  const Row = styled.div`
    display: flex;
  `;

  const Col = styled.div`
    flex: 50%;
  `;

  return (
    <Navbar>
      <div className="App-Logo" style={{ width: "200px", float: "left" }}>
        {/* <ReactLogo style={{ marginTop: "10px" }} /> */}
        {/* <img src={mainLogo} alt="Quizcraft Logo" height="65px" style={{marginLeft: "10px"}}/> */}
        {/* <AppLogo src={main_logo} /> */}
      </div>
      <div style={{ float: "right" }}>
        {/* <BronzeMedal src={bronze_medal}/> */}
      </div>
    </Navbar>
  );
};

export default Navbar;

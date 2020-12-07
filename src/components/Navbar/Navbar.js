import React from "react";
import styled from "styled-components";

// Colors
import { COLOR } from "../../global/const";

const Navbar = () => {
  const Navbar = styled.div`
    background-color: ${COLOR.MANDARIN};
    width: 100%;
    height: 65px;
    padding: 0;
    margin: 0;
  `;

  return (
    <Navbar>
      <div className="App-Logo" style={{ width: "200px", float: "left" }}></div>
      <div style={{ float: "right" }}></div>
    </Navbar>
  );
};

export default Navbar;

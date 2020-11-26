import React from "react";
import styled from 'styled-components';

// Resources
import mainLogo from "../../resources/Homepage/logo.png";

const Navbar = () => {

  const Navbar = styled.div`
    display: inline-block;
    background-color: black;
  `

  return (
    <Navbar>
      <img src={mainLogo} alt="Quizcraft Logo" height="100" />
      <a class="active" href="#home">
        Home
      </a>
      <a href="#news">News</a>
      <a href="#contact">Contact</a>
      <a href="#about">About</a>
    </Navbar>
  );
};

export default Navbar;

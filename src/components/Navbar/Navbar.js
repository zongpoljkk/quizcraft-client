import React from "react";
import mainLogo from "../../resources/Homepage/logo.png";

const Navbar = () => {
  return (
    <div class="topnav">
      <img src={mainLogo} alt="Quizcraft Logo" height="100" />
      <a class="active" href="#home">
        Home
      </a>
      <a href="#news">News</a>
      <a href="#contact">Contact</a>
      <a href="#about">About</a>
    </div>
  );
};

export default Navbar;

import React from "react";

import mainLogo from "../assets/thumbnail/logo.png";

const Navbar = () => {
  return (
    <div className="topnav">
      <img src={mainLogo} alt="Quizcraft Logo" height="100" />
      <a className="active" href="#home">
        Home
      </a>
      <a href="#news">News</a>
      <a href="#contact">Contact</a>
      <a href="#about">About</a>
    </div>
  );
};

export default Navbar;

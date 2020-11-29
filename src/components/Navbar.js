import React from "react";

const Navbar = () => {
  return (
    <div className="topnav">
      <img src={require('../assets/thumbnail/logo.png')} alt="Quizcraft Logo" height="100" />
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

// UncontrolledLottie.jsx
import React, { Component } from "react";
import Lottie from "react-lottie";
import animationData from "../../assets/lottie/coin.json";

class Coin extends Component {
  render() {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        // preserveAspectRatio: 'xMidYMid slice'
        preserveAspectRatio: "xMidYMid meet",
      },
    };

    return (
      <div style={{display: "inline-block", marginTop: "8px"}}>
        <Lottie options={defaultOptions} height={30} width={30}/>
      </div>
    );
  }
}

export default Coin;

import React from "react";
import Lottie from 'react-lottie';

export const LottieFile = ({
  animationData,
  height,
  width,
  loop = true,
  autoplay =true,
}) => {

  const defaultOptions = {
    loop: loop,
    autoplay: autoplay,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid meet",
    },
  };

  return ( 
    <Lottie 
      options={defaultOptions}
      height={height}
      width={width}
    />
  );
};
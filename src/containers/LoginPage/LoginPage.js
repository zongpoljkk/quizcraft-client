import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";

import logo_animation from "../../assets/gif/logo_animation.gif";
import logo from "../../assets/thumbnail/logo.png";
import { Button } from "../../components/Button"
import config from "../../config";

const LoginPage = ({ history }) => {
  const user_id = localStorage.getItem("userId");
  const redirect_uri = 'http://localhost:3000/oauth/mcv-callback'
  const URL = `https://www.mycourseville.com/api/oauth/authorize?response_type=code&client_id=${config.client_id}&redirect_uri=${redirect_uri}`;
  const [display_login, set_display_login] = useState(false)
  const variants = {
    visible: {
      opacity: 1,
      display: "block",
    },
    hidden: {
      opacity: 0,
      transitionEnd: {
        display: "none",
      },
    },
  };

  const item = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const onComplete = () => {
    set_display_login(true)
  }

  const onClickLogin = () => {
    window.location.assign(URL);
  }

  useEffect(() => {
    if(user_id) {
      history.push("/homepage");
      history.go(0);
    }
  }, [])

  return (
    <Container>
      <motion.div   
        initial="visible"
        animate="hidden"
        transition={{ duration: 1.25 }}
        variants={variants}
        style={{zIndex: 1, position: "fixed"}}
        onAnimationComplete={onComplete}
      >
        <img width={400} height={400} src={logo_animation}/> 
      </motion.div>
      {display_login &&
        <LoginContainer
          initial="hidden"
          animate="visible"
          variants={item}
          transition={{ duration: 0.2 }}
        >
          <img width={280} style={{marginBottom: "64px"}} src={logo} /> 
          <Button onClick={onClickLogin.bind(this)}> เข้าสู่ระบบ </Button>
        </LoginContainer>
      }
    </Container>
  );
};


const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const LoginContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 0;
  position: fixed;
`;

export default withRouter(LoginPage);
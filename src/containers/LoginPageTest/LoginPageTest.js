import React from "react";
import styled from "styled-components";
import { LottieFile } from "../../components/LottieFile";
import loadingData from "../../assets/lottie/loading.json";
import { Body } from "../../components/Typography";
import { Button } from "../../components/Button"

import { COLOR } from "../../global/const";

import {client_id} from "./config"
const redirect_uri = 'http://localhost:5000/api/auth/mcv-callback'
// const redirect_uri = 'http://localhost:3000'
const URL = `https://www.mycourseville.com/api/oauth/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}`;

const LoginPageTest = () => {

  return (
    <Container>
      <a href={URL}>
        <Button>
          Login via smart school
        </Button>
      </a>
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

export default LoginPageTest

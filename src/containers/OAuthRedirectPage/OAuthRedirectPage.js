import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import { useHistory } from 'react-router-dom'
import qs from 'query-string'
import axios from 'axios'

import backend from '../../ip';
import LoadingPage from '../LoadingPage/LoadingPage';

const OAuthRedirectPage = () => {
  const params = qs.parse(window.location.search);
  const { code } = params;
  const history = useHistory()

  const redirectAPI = async () => {
    try {
      const response = await axios.post(backend+"auth/login-via-mcv", {
        code : code,
      });
      
      if (response.data) {
        const { success, token } = response.data
        if (success) {
          var decoded = jwt_decode(token);
          var userId = decoded.userId;
          localStorage.setItem("token", token);
          localStorage.setItem("userId", userId);
          history.push('/homepage');
          history.go(0);
        } else {
          history.push('/')
        } 
      }
    } catch (e) {
      history.push('/')
    }
  }

  useEffect(() => {
    redirectAPI()
  }, [])

  return <LoadingPage />
;}



export default OAuthRedirectPage;
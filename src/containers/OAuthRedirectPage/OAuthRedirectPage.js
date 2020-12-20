import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import { useHistory } from 'react-router-dom'
import qs from 'query-string'
import axios from 'axios'

import backend from '../../ip';

const OAuthRedirectPage = () => {
  const params = qs.parse(window.location.search);
  const { code } = params;
  const [token, set_token] = useState("");

  const history = useHistory()

  const redirectAPI = async () => {
    try {
      const response = await axios.post(backend+"auth/login-via-mcv", {
        code : code,
      });
      
      if (response.data) {
        const { success, token } = response.data
        if (success) {
          set_token(token);
          var decoded = jwt_decode(token);
          var userId = decoded.userId;
          sessionStorage.setItem("token", token);
          sessionStorage.setItem("userId", userId);
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

  return null
;}



export default OAuthRedirectPage;
import qs from 'query-string'
import axios from 'axios'
import React, { useEffect, useState } from 'react';
import backend from '../../ip';
import { useHistory } from 'react-router-dom'

const OAuthRedirectPage = () => {
  const params = qs.parse(window.location.search)
  const { code } = params;
  const [token, set_token] = useState("");

  const history = useHistory()

  const redirectAPI = async () => {
    try {
      console.log(backend + "auth/login-via-mvc")
      const response = await axios.post(backend+"auth/login-via-mcv", {
        code : code,
      });
      
      if (response.data) {
        const { success, token } = response.data
        if (success) {
          set_token(token);
          history.push('/homepage')
        } else {
          history.push('login')
        } 
      }
    } catch (e) {
      console.log('hellooooo')
      history.push('/login')
    }
  }

  useEffect(() => {
    redirectAPI()
  }, [])

  return null
;}



export default OAuthRedirectPage;
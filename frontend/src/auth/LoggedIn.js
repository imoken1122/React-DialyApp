import React from 'react';
import axios from 'axios'
import { Redirect } from 'react-router-dom';
import { withCookies } from 'react-cookie';
import {getJwt, signup} from "../api/postDialy"
import { DataUsage } from '@material-ui/icons';

const LoggedIn = (props) => {
    if (props.cookies.get("dialy-token")){
        console.log(props.cookies)
        const data = {token : props.cookies.get('dialy-token')}
        axios.post(`http://localhost:8000/api/token/verify/`,data,{
            headers: {
            'content-type': 'application/json'
          }}).then(res => {
        }).catch(err => {
            alert("再度ログインが必要です")
            props.cookies.remove("dialy-token")
            window.location.href="/signin"
        })
        return props.children
    }
    else{
        return <Redirect to="/" />
    }
}

export default withCookies(LoggedIn);
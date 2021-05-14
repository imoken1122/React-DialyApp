import React from 'react';
import axios from 'axios'
import { Redirect,useHistory } from 'react-router-dom';
import { withCookies } from 'react-cookie';
const LoggedIn = (props) => {

    const history = useHistory();
    if (props.cookies.get("dialy-token")){
        console.log(props.cookies)
        const data = {token : props.cookies.get('dialy-token')}
        axios.post(`http://localhost:8000/api/token/verify/`,data,{
            headers: {
            'content-type': 'application/json'
          }}).then(res => {
             localStorage.setItem("userid",res.data.user.id)
        }).catch(err => {
            alert("再度ログインが必要です")
            props.cookies.remove("dialy-token")
            history.push('/');
        })
        console.log(4)
        return props.children
    }
    else{
        return <Redirect to="/" />
    }
}

export default withCookies(LoggedIn);
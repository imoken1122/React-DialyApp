
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import React, { useState, useEffect, useRef } from 'react';
import { useCookies } from 'react-cookie';
import  { useHistory } from 'react-router-dom';
import {getJwt, signup} from "../api/postDialy"
function sleep(a){
    var dt1 = new Date().getTime();
    var dt2 = new Date().getTime();
    while (dt2 < dt1 + a){
      dt2 = new Date().getTime();
    }
    return;
  }
const Form = (props) => {


    const history = useHistory()
    const [cookie, setCookie] = useCookies()
    let info = {"email":"","name":"","password":""}
    if (props.login){
        info = {"email":"","password":""}
    }
    const [userinfo,setUserInfo] = useState(info)

    const handlerLogin = () => {
            console.log(userinfo)
            getJwt(userinfo).then(res => {

                console.log(res)
                setCookie("accesstoken", res.data.access, {path:"/"},{httpOnly:true})
                setCookie("refreshtoken", res.data.refresh, {path:"/"},{httpOnly:true})
                history.push("/posts")
            }).catch(err=>{
                console.log(err)
                alert("username or password が違います")
            })
        }
    const handlerSignup = () => {
        const jwtinfo = {"email":userinfo.email,"password":userinfo.password}
        getJwt(jwtinfo).then(res => {
            alert("このメールアドレスは登録されています")
        }).catch(ok => {
            signup(userinfo)
            sleep(2500)
            getJwt(jwtinfo).then(res => {
                console.log(res)
                setCookie("accesstoken", res.data.access, {path:"/"},{httpOnly:true})
                setCookie("refreshtoken", res.data.refresh, {path:"/"},{httpOnly:true})
                history.push("/posts")}).catch(err=>{
                    console.log(err)
                    alert("予期しないエラー")
                })
        })

    }
    console.log(cookie.acccesstoken)
    const onChangehandler = (e) => {
        setUserInfo(userinfo => ({...userinfo ,[e.target.name]:e.target.value}))
        userinfo[e.target.name] = e.target.value

    }
        return( 
        <>
            <div align="center"> 
                {props.login ? <></> :
                <TextField
                        name = "name"
                    label="ユーザ名"
                    variant="outlined"
                    style={{width:"70%", marginBottom:15}}
                    inputProps={{style: {fontSize: 20, lineHeight:1.4}}} 
                        onChange={onChangehandler}
                    />
                }
            
                <TextField
                name = "email"
                    label="メールアドレス"
                    variant="outlined"
                    style={{width:"70%", marginBottom:15}}
                    inputProps={{style: {fontSize: 20, lineHeight:1.4}}} 
                        onChange={onChangehandler}
                    />
                <TextField
                    name="password"
                    label="パスワード"
                    type="password"
                    autoComplete="current-password"
                    variant="outlined"
                    style={{width:"70%"}}
                    inputProps={{style: {fontSize: 20, lineHeight:1.4}}} 
                        onChange={onChangehandler}
                    />
                </div>
                <div  align="center">
                    <Button onClick={() => {props.login? handlerLogin() : handlerSignup()}} style={{marginTop:60,padding:"11px 120px 11px 120px", backgroundColor:"#4A8ADA",borderRadius:120}} variant="contained" color="primary" disableElevation >
                        <Box fontWeight={801}  style={{color:"white",fontSize:20}}>
                             ログイン
                        </Box>
                        </Button>
            </div>
    </>
    )
}

export default Form
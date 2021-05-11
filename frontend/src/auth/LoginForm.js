import React from "react"
import Header from "./Header"
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';

const LoginForm = (props) => {


    return( 
        <>
            <div align="center"> 
            {props.login ? <></> :
                <TextField
                        label="ユーザ名"
                        variant="outlined"
                        style={{width:"70%", marginBottom:15}}
                        inputProps={{style: {fontSize: 20, lineHeight:1.4}}} 
                        />
            }
                <TextField
                    label="メールアドレス"
                    variant="outlined"
                    style={{width:"70%", marginBottom:15}}
                    inputProps={{style: {fontSize: 20, lineHeight:1.4}}} 
                    />
                <TextField

                    label="パスワード"
                    type="password"
                    autoComplete="current-password"
                    variant="outlined"
                    style={{width:"70%"}}
                    inputProps={{style: {fontSize: 20, lineHeight:1.4}}} 
                    />
                </div>
                <div  align="center">
                    <Button style={{marginTop:60,padding:"11px 120px 11px 120px", backgroundColor:"#4A8ADA",borderRadius:120}} variant="contained" color="primary" disableElevation >
                    <Box fontWeight={801}  style={{color:"white",fontSize:20}}>
                        ログイン
                        </Box>
                        </Button>
            </div>
    </>
    )
}

export default LoginForm
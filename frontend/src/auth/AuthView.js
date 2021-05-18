import React from "react"
import Header from "./Header"
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import LogoIcon from "../images/Logo.js" 
import {  withCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Form from "./Form"
const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
    marginTop:120,

      width: theme.spacing(60),
      height: theme.spacing(86),

    },
   title:{
       fontSize:40
   }
  },
}));

function Select(){
    return (
        <div  align="center">
        <Button component={Link} to={"/signup"} style={{marginTop:20,padding:"11px 120px 11px 120px", backgroundColor:"#4A8ADA",borderRadius:120}} variant="contained" color="primary" disableElevation >
            <Box fontWeight={801}  style={{color:"white",fontSize:20}}>
                アカウント作成
                </Box>
        </Button>
         <Button component={Link} to={"/signin"} style={{marginTop:15,padding:"11px 150px 11px 150px", backgroundColor:"#F1F1F1",borderRadius:120}} variant="contained" color="primary" disableElevation >
            <Box fontWeight={801}  style={{color:"#333333",fontSize:20}}>
                ログイン
                </Box>
            </Button>
         </div>
    )
}

function AuthView(props) {
    let parts = ""

    const classes = useStyles();
    if (props.bool == 3){
        parts = <Select />
    }else{
        parts = <Form login={props.bool} cookies={props.cookies} nameFunc={props.nameFunc}/>
    }

    return (
        <div>
            <Header />
            <Container maxWidth="sm">
            <div className={classes.paper}>
                <Paper elevation={3}>
                    <div align="center" style={{backgroundColor :"white",height:200, marginBottom:85}} >
                        <LogoIcon style={{backgroundColor:"transparent",width:"85%",marginTop:30, marginLeft:10}} />
                        {/*<Box fontWeight={801} letterSpacing={-6} m={1} fontFamily="Monospace"  style={{fontSize:80,color:"#4A8ADA",paddingTop:70}}>
                            Otama
                           </Box> */}
                        <Box fontWeight={854} fontFamily="Monospace" style={{fontSize:20,color:"#333333",marginTop:-95, zIndex:1}}>
                            自分の毎日を記録しよう
                        </Box>
                
                    </div>
                    {parts}
                </Paper>

            </div>

            </Container>

        </div>
    )

}

export default  withCookies(AuthView)
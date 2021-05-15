import React from 'react';
import {makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withCookies } from 'react-cookie';

import Box from '@material-ui/core/Box';
import { Link } from 'react-router-dom';
import CheckIcon from '@material-ui/icons/Check';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {postPost,postPostEdit} from "./api/postDialy"
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    appbar:{
        backgroundColor:"#F2F6FA",
        zIndex: theme.zIndex.drawer + 1,
    },

    pubbutton:{

       backgroundColor:"#4A8ADA",
       color:"white",
        marginRight:50,
        margin:25,
       '&:hover': {
        backgroundColor: '#0069d9',
        borderColor: '#0062cc',
        boxShadow: 'none',
      },
    },
    backbutton:{
        backgroundColor:"transparent" ,
        '&:hover': {
            backgroundColor: '#transparant',
            borderColor: 'transparent',
            boxShadow: 'none',
        },
    },
    backicon:{
        color:"#4A8ADA",
        margin:"0px 0px 0px 30px",
        fontSize:30,

    },
    text:{
        display: "inline-block",
        color:"#4A8ADA",
        fontSize:20,
        flexGrow: 1,
        margin:"5px 0px 0px 0px", 

    },
  
}));
const pubtime = () =>{
    const a = new Date()
    var str = a.getFullYear()
        + '-' + ('0' + (a.getMonth() + 1)).slice(-2)
        + '-' + ('0' + a.getDate()).slice(-2)
        + 'T' + ('0' + a.getHours()).slice(-2)
        + ':' + ('0' + a.getMinutes()).slice(-2)
        +"Z"
    return str
}
function handlerClick(info,cookies){

    console.log(cookies)
    if(info.title == "" || info.text == ""){
        alert('空欄があります') 
    }else if(info.id){

        info.published_date = pubtime()
        postPostEdit(info,cookies)  
    }else {


        info.published_date = pubtime()
        info.created_date = pubtime()
        postPost(info,cookies)
        window.location.href = "/posts"
    }
}
function PostEditHeader(props){
    const classes = useStyles();

    return (
        <AppBar position="fixed" className={classes.appbar}>
        <Toolbar>

            <ArrowBackIosIcon className={classes.backicon}/>
                <Typography  className={classes.text}>
                <Link to={`/posts`} >
                        戻る
                        </Link>
                </Typography > 

          <Button
            variant="contained"
                className={classes.pubbutton}
                startIcon={<CheckIcon fontSize="large" />}
                size="large"
                onClick={()=>{handlerClick(props.info, props.cookies.get("dialy-token"))}}
            >
                 <Box fontFamily="Monospace" fontSize={15} fontWeight={801} >
                    投稿する
                 </Box>
        </Button>

        </Toolbar>
      </AppBar>

    )

}
export default withCookies(PostEditHeader);
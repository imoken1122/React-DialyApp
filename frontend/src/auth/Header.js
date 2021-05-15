import React from 'react';
import {makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    appbar:{
        backgroundColor:"#F2F6FA",
        zIndex: theme.zIndex.drawer + 1,
    },
    title: {
        paddingLeft:100,
        paddingTop:10,
        fontSize:35,
        color:"#4A8ADA",
      flexGrow: 1,
    },
  
    text:{
        color:"black",
    },
 

}));

function Header(){
    const classes = useStyles();
    return (
        <AppBar position="fixed" className={classes.appbar}>
        <Toolbar>
  
              <Typography variant="h6" className={classes.title}>

              <Link to={`/`} style={{color:"black" ,fontSize:17, textDecoration: "none"}} >
                      <p className={classes.title}>
                        Otama
                      </p>
                  </Link>

              </Typography>
        </Toolbar>
    </AppBar>
          
    )
}
export default Header;
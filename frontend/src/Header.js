import React from 'react';
import {fade ,makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CreateIcon from '@material-ui/icons/Create';
import SearchIcon from '@material-ui/icons/Search';
import { Link } from 'react-router-dom';
import InputBase from '@material-ui/core/InputBase';
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
    pubbutton:{
       backgroundColor:"#4A8ADA",
       color:"white",
       margin: theme.spacing(3),
       '&:hover': {
        backgroundColor: '#0069d9',
        borderColor: '#0062cc',
        boxShadow: 'none',
      },
    },
    text:{
        color:"black",
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(12),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(3),
          width: 'auto',
        },

      },
      searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        color:"black",
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
          width: '20ch',
        },
      },

}));

function Header(){
    const classes = useStyles();
    return (
        <AppBar position="fixed" className={classes.appbar}>
        <Toolbar>
  
              <Typography variant="h6" className={classes.title}>
                  <Link to={`/posts`} style={{color:"black" ,fontSize:17, textDecoration: "none"}} >
                      <p className={classes.title}>
                        Otama
                      </p>
                  </Link>
              </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          
          <Button
            variant="contained"
                className={classes.pubbutton}
                startIcon={<CreateIcon fontSize="midium" />}
                size="large"
                component={Link}
                  to="/post/new"

            >
                 <Typography >
                      記事を書く
                 </Typography>
        </Button>

        {/*<Button color="inherit">
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
    </Button>*/}
        <Button color="inherit" className="classes.login">
        <Typography className={classes.text}>
            ログイン
            </Typography>
            </Button>
        </Toolbar>
      </AppBar>
    )
}
export default Header;
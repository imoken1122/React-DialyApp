import React,{useContext } from 'react';
import {fade ,makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import CreateIcon from '@material-ui/icons/Create';
import SearchIcon from '@material-ui/icons/Search';
import { withCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import LogoIcon from "./images/Logo.js" 
import MenuItem from '@material-ui/core/MenuItem';
import Box from '@material-ui/core/Box';
import InputBase from '@material-ui/core/InputBase';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ReplyIcon from '@material-ui/icons/Reply';
import {loadContext} from "./Home"
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
        paddingBottom:10,
        fontSize:35,
        color:"#4A8ADA",
      flexGrow: 1,
    },
    pubbutton:{
       backgroundColor:"#4A8ADA",
       color:"white",
       margin: theme.spacing(3),
       marginRight:50,
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
      mbtn:{
        padding:20
      },
      menu:{
        paddingTop:10,
        paddingBottom:40,
        paddingLeft:80,
        paddingRight:40,
        color:"#424242"
      },
      menuout:{
        paddingTop:20,
        paddingBottom:20,
        paddingLeft:80,
        paddingRight:40,
        backgroundColor:"#FFF2F2",
      }

}));



function SimpleMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles()
  let [posts,setPosts] = useContext(loadContext)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose= () => {
    setAnchorEl(null);

  };
  const handleLogout = () => {
    setAnchorEl(null);
    setPosts([])
    posts = []
    console.log(posts)
    props.cookies.remove("dialy-token")
    localStorage.removeItem("userid")
    window.location.href = "/"

  }

  return (
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} className={classes.mbtn}>
        <AccountCircleIcon style={{fontSize:55,color:"#717171"}}/>
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className={classes.menu}
      >
       <div>
          <CheckCircleIcon fontSize="large" style={{marginLeft:30,marginBottom:-53,color:"#37E731"}}/>
          <Box fontWeight={801}  className={classes.menu}>
            {`${localStorage.getItem("username")} でログイン中`}
            </Box>
         </div> 
        <Divider />

          <MenuItem onClick={ handleLogout}  className={classes.menuout}>
            <div>
            {/* <ReplyIcon style={{fontSize:40, marginLeft:-50,marginRight:20,color:"#7E7E7E"}}/> */}
            </div>
      
              <Box textAlign="left" fontWeight={801} fontSize={20} style={{color:"#E13737"}}> ログアウトする</Box>
          </MenuItem>

      
      </Menu>
    </div>
  );
}
function Header(props){
  console.log(props)
    const classes = useStyles();
    return (
        <AppBar position="fixed" className={classes.appbar}>
        <Toolbar>
  
              <Typography variant="h6" className={classes.title}>
                  <Link to={`/posts`} style={{color:"black" ,fontSize:17, textDecoration: "none"}} >
                  <LogoIcon style={{backgroundColor:"transparent",width:160,marginBottom:-38,marginTop:-15}}/>

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
          <Box fontFamily="Monospace"fontWeight={801} >
                      記事を書く
                 </Box>
        </Button>

        {/*<Button color="inherit">
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
    </Button>*/}

        <SimpleMenu cookies={props.cookies} />
        </Toolbar>
      </AppBar>
    )
}
export default withCookies(Header);
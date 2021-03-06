

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withCookies } from 'react-cookie';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import { Link } from "react-router-dom";
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {postDelete} from "./api/postDialy"
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
let pushFlag =false 
let cnt = 0
let cookies
const useStyles = makeStyles((theme) => ({
    root: {
        width: 'auto',

        paddingLeft:theme.spacing(48),
        paddingRight:theme.spacing(10),

        backgroundColor: theme.palette.background.paper,
      },
 
    list:{
      marginTop:50,
      paddingTop:200
    },
    inline: {
        display: 'inline',
      },
    subheader:{
        position:"fixed",
        marginBottom:70,
        width:"100%",
        paddingTop:100,
        paddingBottom:20,
        backgroundColor:"white",
        zIndex:1
    },
    icon:{
        fontSize:55,
        marginRight:20,
        color:"#AFD6FF"
    },
    foldername:{
        fontSize:38,
        color:"#3B3B3B",
        paddingBottom:10,

    },
    posttitle:{
      size:40,
      color:"black",

    }

}));

const options = [
    "編集",
    "削除"
  ];
  
const ITEM_HEIGHT = 48;
function LongMenu(props) {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
  
    const handleClick = (event) => {
      pushFlag=true

      event.preventDefault()
      setAnchorEl(event.currentTarget);
      

    };
  
    const handleEdit = (id) => {
        handleClose()
    };
    const HandleRemove =(id) =>{
        postDelete(id,cookies)
        handleClose()
        window.location.reload()
    }
    const handleClose = () => {
      setAnchorEl(null);

    };
    return (
      <div >
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleClick}

        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: '20ch',
            },
          }}
        >

            <Link to={`/post/edit/${props.id}`} style={{color:"black" ,fontSize:17, textDecoration: "none"}}>
              <MenuItem  key={options[0]} selected={options[0] === 'Pyxis'} onClick={() => handleEdit(props.id)}>
              {options[0]}
             </MenuItem>
            </Link>
            <MenuItem key={options[1]} selected={options[1] === 'Pyxis'} onClick={() => HandleRemove(props.id)}>
            <Box fontWeight="fontWeightMedium" color="#E13737">{options[1]}</Box>
            </MenuItem>


        </Menu>
      </div>
    );
  }
function tf(time){

    const a = time.split("T")
    const b = a[0].split("-")
    const c = a[1].substr(0,5 );
    return `${b[0]}年${b[1]}月${b[2]}日  ${c}` 
  }
  
function SubPost(props){
    const classes = useStyles() 
    const handlelist = (e) =>{
      if (pushFlag){
        e.preventDefault()
        
        if (cnt < 2) cnt++
      }
      if (cnt==2){
            pushFlag = false
          cnt = 0
      }

    }

    return(
        <>
      <ListItem button key={props.id} onClick={handlelist} component={Link} style={{paddingTop:20,paddingBottom:20,}} to={`/posts/${props.id}`} >
              <ListItemIcon><DescriptionOutlinedIcon className={classes.icon}/></ListItemIcon>
           
               <ListItemText  >
                <Box fontFamily="Monospace" fontSize={23} fontWeight={401} color="#525252" >
                {props.title} 
                  </Box>
                  </ListItemText>
              <Typography >{tf(props.created_date)}</Typography> 

              <LongMenu id={props.id} className={classes.menu} />
      </ListItem>
        <Divider variant="inset" component="li" />
    </>
  );
}



function PostList(props){
    const classes = useStyles()
    cookies = props.cookies.get("dialy-token")
    console.log(props)
    return (

        <div className={classes.root}>
            <div className={classes.subheader}>
              <Typography className={classes.foldername}>
                
                  {props.cat} 
              </Typography>
              <Divider  />
            </div>
            <List className={classes.list}>
                {props.posts.map((d) => 
                  <div>

                      <SubPost {...d}/> 

                  </div>
                  )}

            </List>
        </div>
    );
}

export default withCookies(PostList);
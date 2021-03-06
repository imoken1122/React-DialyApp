
import { makeStyles } from '@material-ui/core/styles';
import { withCookies } from 'react-cookie';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Drawer from '@material-ui/core/Drawer';
import FolderIcon from '@material-ui/icons/Folder'
import List from '@material-ui/core/List';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import {getCategoryName } from "./api/getDialy"
import TextField from '@material-ui/core/TextField';
import {addCategory} from "./api/postDialy"
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {rmCategory, putCategory} from "./api/postDialy"
const drawerWidth = 350;
let pushFlag =false 
let cnt = 0
let dcnt = 0
let inCat = 0
let cookies = ""
const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        backgroundColor:"#F4F5FB",
    },
    drawrContainer:{
        overflow: 'auto',
        paddingTop:20,
    },
    toolbar: theme.mixins.toolbar,
    iconcolor:{color:"#7EB6FF"},
    list:{
        paddingTop:120,
        paddingLeft:20
    },
    title: {
        flexGrow: 1,
        margin:"30px -23px 20px 40px",
        display: "inline-block",
        color:"#5B5B5B"
      },
    addfolder:{
        left:80,
        backgroundColor:"white",
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
      },
    dialog:{
        width:500,
        height:100,
    }
}));



function DialogComponet(props){
  const classes = useStyles();
  let state = ""
  let flag = true
  if(props.info){
    state = props.info.category
    flag = false
  }
  const [name, setName] = React.useState(state);

  const handleChange = (event) => {
    setName(event.target.value)

  };
   const handleClose = () => {
    props.setOpen(false);
  };
  const confirminCat = () => {

      for(let i=0;i < inCat.length;i++){
          console.log(inCat[i].category == name)
          if (inCat[i].category == name) return false
        }
    return true
  }
  const handleOK =() => {
    if (confirminCat(name)){
      if(props.info) {
        props.info.category = name

        putCategory(props.info,cookies)
      }
      else addCategory({category:name,user:localStorage.getItem("userid")},cookies)
      window.location.reload()
    }else{
      alert("?????????????????????????????????")
    }
    props.setOpen(false)
  }
  return(
      <Dialog  disableBackdropClick disableEscapeKeyDown open={props.open} onClose={handleClose}>
          <p style={{marginLeft:20}}>{flag ? "????????????????????????" : "?????????????????????"}</p>
            <DialogContent className={classes.dialog}>
              <form className={classes.container}>

                  <TextField id="folder-name" label="???????????????" style={{ margin: 8 }}
                          fullWidth
                          margin="normal"
                          onChange={handleChange}
                          InputLabelProps={{
                              shrink: true,
                          }} 
                          defaultValue={name=="" ? "" : name}
                  />

              </form>

            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button disabled={name==""} onClick={handleOK} color="primary">
                Ok
              </Button>
            </DialogActions>
          </Dialog>

  )
}


function DialogSelect() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
 
  return (
      <>
      <Button
              variant="contained"
              color="default"
              onClick={handleClickOpen}
              className={classes.addfolder}
              startIcon={ <CreateNewFolderIcon fontSize="large" className={classes.iconcolor} />}
          >
          <Box fontFamily="Monospace" fontWeight={601} color="#5B5B5B" >
              ??????????????????
            </Box>
          </Button>
        <DialogComponet open={open} setOpen={setOpen}/> 
  </>
  );
}

const options = [
  "??????",
  "??????"
];

const ITEM_HEIGHT = 48;
function LongMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [dialogopen, setDialogOpen] = React.useState(false);
  const handleClickOpen = () => {
    if (dcnt == 0) {
      setDialogOpen(true);
      dcnt++
    }
    else if (dcnt == 1) dcnt = 0
     handleClose()
  };
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    pushFlag=true

    event.preventDefault()
    setAnchorEl(event.currentTarget);
    

  };

  const handleEdit = (info) => {
    console.log(cookies)
      putCategory(info,cookies)
      handleClose()
  };
  const HandleRemove =(id) =>{
      rmCategory(id,cookies)
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

            <MenuItem  key={options[0]} selected={options[0] === 'Pyxis'} onClick={handleClickOpen}>
            {options[0]}
            <DialogComponet open={dialogopen} setOpen={setDialogOpen} info={props.info}/>
           </MenuItem>
          <MenuItem component={Link} to={"/posts"} key={options[1]} selected={options[1] === 'Pyxis'} onClick={() => HandleRemove(props.info.id)}>
            <Box color="#E13737">{options[1]}</Box>
          </MenuItem>


      </Menu>
    </div>
  );
}
function Sidebar(props){
    const classes = useStyles();
    const state = {id:"",category:""}
    const [cat, setCat] = useState(state)
    const [loading, setLoading] = useState(true)
    cookies =props.cookies.get("dialy-token")
    const handlelist = (e) =>{
      if (pushFlag){
        e.preventDefault()
        
        if (cnt < 3) cnt++
      }
      if (cnt==3){
            pushFlag = false
          cnt = 0
      }

    }
    useEffect(()=>{
      getCategoryName(props.cookies.get("dialy-token")).then(d => {
            setCat(d)
            setLoading(false)
        }).catch(e =>{

            throw new Error(e)
        })
    },[])
    inCat = cat

    return (
    <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}

      >
      <Toolbar />
        <div className={classes.drawrContainer} />
        <Divider />
        <div???style={{position:"fixed", paddingTop:10,marginTop:90,backgroundColor:"#F4F5FB",paddingRight:88, zIndex:1}}>
          <Box fontFamily="Monospace"fontWeight={801} className={classes.title}>
                ???????????????
                </Box>
            
            <DialogSelect />
        <Divider style={{marginTop:13}}/>
        </div>
        {loading ?
                <></>
                :
        <List className={classes.list}> 
            <Link to={`/posts`} style={{color:"black" ,fontSize:17, textDecoration: "none"}} >
               <ListItem button >
                  <ListItemIcon><FolderIcon fontSize="large" className={classes.iconcolor}/></ListItemIcon>
                  <ListItemText  >
                <Box fontFamily="Monospace" fontWeight={601} color="#6D6D6D" >
                  ?????????   
                  </Box>
                  </ListItemText>
            </ListItem>
                </Link>
            <Link to={`/posts/folder/?????????`} style={{color:"black" ,fontSize:17, textDecoration: "none"}} >
                <ListItem button >
                  <ListItemIcon><FolderIcon fontSize="large" className={classes.iconcolor}/></ListItemIcon>
                  <ListItemText  >
                <Box fontFamily="Monospace" fontWeight={601} color="#6D6D6D" >
                  ?????????
                  </Box>
                  </ListItemText>
              </ListItem>
           </Link>

          { cat.map((d, index) => (

            <ListItem button key={index} onClick={handlelist} component={Link} to={`/posts/folder/${d.category}`} style={{color:"black" ,fontSize:17, textDecoration: "none"}} >
                <ListItemIcon><FolderIcon fontSize="large" className={classes.iconcolor}/></ListItemIcon>
                
                <ListItemText  >
                <Box fontFamily="Monospace" fontWeight={601} color="#6D6D6D" >
                  {d.category}
                  </Box>
                  </ListItemText>
                <LongMenu info={d}/>
            </ListItem>

          ))}
        </List>
      }
      </Drawer>
    );
}

export default withCookies(Sidebar);
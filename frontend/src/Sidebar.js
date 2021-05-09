
import { makeStyles } from '@material-ui/core/styles';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
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
import DialogTitle from '@material-ui/core/DialogTitle';

import {getCategoryName } from "./api/getDialy"

import TextField from '@material-ui/core/TextField';
import {addCategory} from "./api/postDialy"


import IconButton from '@material-ui/core/IconButton';




import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { PostAddSharp } from '@material-ui/icons';
import {rmCategory, catEdit} from "./api/postDialy"
import { mergeClasses } from '@material-ui/styles'
const drawerWidth = 350;
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
        paddingTop:10,
        paddingLeft:20
    },
    title: {
        flexGrow: 1,
        margin:"30px 0px 20px 20px",
        display: "inline-block"
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
let pushFlag =false 
let cnt = 0
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
      rmCategory(id)
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
          <MenuItem component={Link} to={"/posts"} key={options[1]} selected={options[1] === 'Pyxis'} onClick={() => HandleRemove(props.id)}>
            {options[1]}
          </MenuItem>


      </Menu>
    </div>
  );
}
function DialogSelect() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState("");
  
    const handleChange = (event) => {
      setName(event.target.value)

    };
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    const handleOK =() => {
      setOpen(false)
      addCategory({category:name})
      window.location.reload()

    }
    return (
        <>
        <Button
                variant="contained"
                color="default"
                onClick={handleClickOpen}
                className={classes.addfolder}
                startIcon={ <CreateNewFolderIcon fontSize="large" className={classes.iconcolor} />}
            >
                新規フォルダ
            </Button>
        <Dialog  disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
        <p style={{marginLeft:20}}>新規フォルダ作成</p>
          <DialogContent className={classes.dialog}>
            <form className={classes.container}>

                <TextField id="folder-name" label="フォルダ名" style={{ margin: 8 }}
                        fullWidth
                        margin="normal"
                        onChange={handleChange}
                        InputLabelProps={{
                            shrink: true,
                        }} 
                 />

            </form>

          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleOK} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
    </>
    );
  }

function Sidebar(){
    const classes = useStyles();
    const state = {id:"",category:""}
    const [cat, setCat] = useState(state)
    const [loading, setLoading] = useState(true)
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
    useEffect(()=>{
      getCategoryName().then(d => {
            setCat(d)
            setLoading(false)
        }).catch(e =>{
            throw new Error(e)
        })
    },[])

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
        <div>
            <Typography variant="h6" className={classes.title}>
                フォルダー
            </Typography>
            
            <DialogSelect />
        </div>
        <Divider />
        {loading ?
                <></>
                :
        <List className={classes.list}> 
            <Link to={`/posts`} style={{color:"black" ,fontSize:17, textDecoration: "none"}} >
               <ListItem button >
                  <ListItemIcon><FolderIcon fontSize="large" className={classes.iconcolor}/></ListItemIcon>
                <ListItemText primary="全記事" />
            </ListItem>
                </Link>

          { cat.map((d, index) => (

            <ListItem button key={index} onChange={handlelist} component={Link} to={`/posts/folder/${d.category}`} style={{color:"black" ,fontSize:17, textDecoration: "none"}} >
                <ListItemIcon><FolderIcon fontSize="large" className={classes.iconcolor}/></ListItemIcon>
                <ListItemText primary={d.category} />
                <LongMenu id={d.id}/>
            </ListItem>

          ))}
        </List>
      }
      </Drawer>
    );
}

export default Sidebar;
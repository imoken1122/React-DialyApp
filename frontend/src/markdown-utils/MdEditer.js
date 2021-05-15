
import marked from "marked"
import MDViewer from "./MdViewer"
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import PropTypes from 'prop-types'
import { withCookies } from 'react-cookie';
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {getCategoryName} from "../api/getDialy"
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 160,
    marginTop:100
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
function SimpleSelect(props) {
  const classes = useStyles();


  let [fdname,setFD] = useState(props.n)
  const [catlist, setCat] = useState({id:"",category:""})
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    getCategoryName(props.cookies.get("dialy-token")).then(d => {
          setCat(d)
          setLoading(false)
      }).catch(e =>{
          throw new Error(e)
      })
  },[])
  const handleChange = (event) => {
    setFD(event.target.value)
    fdname =event.target.value
    props.Func(fdname)
    console.log(fdname)
  };

  return (
    <div>
     <FormControl variant="outlined" className={classes.formControl}>
     <InputLabel >フォルダ</InputLabel>
        <Select
        inputProps={{ 'aria-label': 'Without label' }}
        displayEmpty
          value={fdname}
          onChange={handleChange}
          label="フォルダ"

        >
      <MenuItem value="未分類">
            <em>{"未分類"}</em>
          </MenuItem>
      {loading ? <></> :
          catlist.map(d => 
          <MenuItem value={d.category}>{d.category}</MenuItem>
        )}
        </Select>
      </FormControl>
</div>
  )}
class Mde extends React.Component{

    constructor(props){
        super(props);
        this.state = {markdown:"",title:"",category:"未分類"}
        this.flag = false
        if (!props.isNew){
          console.log(props.info)
          this.flag = true
            this.state.title = props.info.title
            this.state.markdown = props.info.text
            this.state.category = props.info.category
        }
        this.updateMD = this.updateMD.bind(this)
        this.updateTitle = this.updateTitle.bind(this)

        this.classes = makeStyles((theme) => ({
            root: {
              flexGrow: 1,

            },
           
          }));
        
          
    }
    updateTitle(e){
      this.setState({title:e.target.value})
      this.state.title = e.target.value
      this.props.myFunc("title",this.state.title)

    }
    updateMD(e){

      this.setState({markdown:e.target.value})
      this.state.markdown = e.target.value
      
      console.log(this.state)
        this.props.myFunc("text",this.state.markdown)
    }
    updateCat(cat){
      this.state.category = cat
      this.props.myFunc("category",this.state.category)
        console.log(this.state)
    }

    render(){
        const h = window.innerHeight
        const html = marked(this.state.markdown)
        return(
            <div className={this.classes.root}>
                <TextField 
                    inputProps={{style: {fontSize: 30, lineHeight:1.4,backgroundColor:"#FAFAFA"}}} 
                    style = {{width: '50%' , top:80, marginRight:50}}
                    onChange={this.updateTitle}

                    variant="filled"
                    color="#F2F5F8"
                    label="タイトル入力"
                    defaultValue={this.flag ? this.state.title : ""}
                />
                <SimpleSelect n={this.state.category} Func={this.updateCat.bind(this)} cookies={this.props.cookies}/>

                <TextField
                        multiline
                        color="#F2F5F8"
                        rows={h/45}
                        inputProps={{style: {fontSize: 20 ,lineHeight:1.5,backgroundColor:"#transparent" }}} 
                        variant="filled"
                        style = {{width: '50%', top:6, marginRight:60}}
                        onChange={this.updateMD}

                           label="Markdownで本文を入力..."
                    defaultValue={this.flag ? this.state.markdown : ""}
                        />

                <Box style = {{width: '44%',height:h-136,  display: "inline-block",marginTop:-160, overflow:"scroll" }} >
                    <InputBase
                            style = {{fontSize:35,color:"black",marginTop:0}}
                            disabled
                            fullWidth
                            value={this.state.title}

                        />
                    <Divider  style = {{position:"reactive",marginTop:50, marginBottom:70}}/>
                    <MDViewer  html={html} />
                </Box>
           
          </div>
        )
    }
}
Mde.propTypes = {
    myFunc: PropTypes.func,
  };
  
  
export default withCookies(Mde);


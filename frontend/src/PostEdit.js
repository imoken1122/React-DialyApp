import React , {useState, useEffect} from "react"
import { makeStyles } from '@material-ui/core/styles';
import PostEditHeader from "./PostEditHeader"
import { useParams } from 'react-router-dom';
import Mde from "./markdown-utils/MdEditer"

import { getPost } from "./api/getDialy";



class PostEdit extends React.Component {
  constructor(props){
    super(props);
    this.info = props.info
    console.log(this.info)

  }
  

  handlemyFunc(m,text){
    this.info[m] = text

  }
  
  render(){

    
  return (
    <div >

      <PostEditHeader info={this.info}/>
      <Mde myFunc={this.handlemyFunc.bind(this)} info={this.info} isNew={this.isNew} />

    </div>
);
}}
export default PostEdit;
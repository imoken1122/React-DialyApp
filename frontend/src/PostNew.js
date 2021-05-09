import React , {useState, useEffect} from "react"
import { makeStyles } from '@material-ui/core/styles';
import PostEditHeader from "./PostEditHeader"
import { useParams } from 'react-router-dom';
import Mde from "./markdown-utils/MdEditer"
import { getPost } from "./api/getDialy";
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
  
  }));

class PostNew extends React.Component {
  constructor(props){
    super(props);
    this.info = {"isOpen":"True","published_date":"","title":"","text":"","category":""}

  }
  

  handlemyFunc(m,text){
    this.info[m] = text

  }

  render(){
  return (
    <div >
      <PostEditHeader info={this.info}/>
      <Mde myFunc={this.handlemyFunc.bind(this)} info={""} />

    </div>
);
}}
export default PostNew;
import React from "react"
import PostEditHeader from "./PostEditHeader"
import Mde from "./markdown-utils/MdEditer"


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
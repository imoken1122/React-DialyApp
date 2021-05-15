import React , {useState, useEffect} from "react"
import PostEdit from "./PostEdit"
import { useParams } from 'react-router-dom';
import { getPost } from "./api/getDialy";

import { withCookies } from 'react-cookie';

function PostEditRoute(props){
    const {id} = useParams()
    const state = {id:"",user:localStorage.getItem("userid"),isOpen:"True",created_date:'',published_date:'',title:'',text:'',category:''}
    const [detail, setDetail] = useState(state)
    const [loading, setLoading] = useState(true)
    let isNew = false
    useEffect(()=>{
      if(id != void 0){
        getPost(id,props.cookies.get("dialy-token")).then(d => {
            setDetail(d)
            setLoading(false)
        }).catch(e =>{
          throw new Error(e)
        })}
        else{
          setLoading(false) 
          isNew = true
        }
    },[])

    return (
      <div>
          {loading ?
                <></>
                :
          <PostEdit id={id} info={detail} isNew={isNew}/>
        }
      </div>
    )
  }

export default withCookies(PostEditRoute)
import React , {useState, useEffect} from "react"
import { makeStyles } from '@material-ui/core/styles';
import PostEdit from "./PostEdit"
import { useParams } from 'react-router-dom';
import Mde from "./markdown-utils/MdEditer"
import { getPost } from "./api/getDialy";


function PostEditRoute(){
    const {id} = useParams()
    const state = {id:'',created_date:'',published_date:'',title:'',text:'',category:''}
    const [detail, setDetail] = useState(state)
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        getPost(id).then(d => {
            setDetail(d)
            setLoading(false)
        }).catch(e =>{
            throw new Error(e)
        })
    },[])

    return (
      <div>
          {loading ?
                <></>
                :
          <PostEdit id={id} info={detail} />
        }
      </div>
    )
  }

export default PostEditRoute
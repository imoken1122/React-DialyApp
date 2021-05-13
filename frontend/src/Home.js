
import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Header from "./Header"
import Sidebar from './Sidebar';
import PostList from "./PostList"
import { getPostList } from './api/getDialy'
import { withCookies } from 'react-cookie';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
  
  }));
function Home(props){

  const classes = useStyles();
  const state = {id:'',created_date:"", published_date:'',title:'',category:'',user:{},text:"",isOpen:""}
  const [posts, setPosts] = useState([])
  const[loading, setLoading] = useState(true);

  useEffect(() => {
    getPostList(props.cookies.get("dialy-token"))
    .then(d => {
        console.log(d.data)
        setPosts(d.data)
        setLoading(false)
    })
    .catch(e => {
        throw new Error(e)
    })
    },[props.cookies])
  console.log(posts)
  return (
    <div className={classes.root}>
      <Header />
      <Sidebar cookies={props.cookies}/>
          {loading ?
                <></>
                :
          <PostList posts={posts}  title="全記事"/>
      }
  </div>
);
}


export default withCookies(Home);


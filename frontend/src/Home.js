
import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Header from "./Header"
import Sidebar from './Sidebar';
import PostList from "./PostList"
import { getPostList } from './api/getDialy'
import PostEdit from "./PostEdit"
import Post from "./Post"

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
  
  }));
function Home(){

  const classes = useStyles();
  const state = {id:'', published_date:'',title:'',category:''}
  const [posts, setPosts] = useState(state)
  const[loading, setLoading] = useState(true);

  useEffect(() => {
    getPostList()
    .then(d => {
        setPosts(d)
        setLoading(false)
    })
    .catch(e => {
        throw new Error(e)
    })
    },[])
  return (
    <div className={classes.root}>
      <Header />
      <Sidebar />
          {loading ?
                <></>
                :
          <PostList posts={posts} title="全記事"/>
      }
  </div>
);
}


export default Home;


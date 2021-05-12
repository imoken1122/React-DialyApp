
import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom'
import Header from "./Header"
import Sidebar from './Sidebar';
import PostList from "./PostList"
import { getCategoryPostList } from './api/getDialy'


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
  
  }));
function FolderPostList(){

  const classes = useStyles();
  const state = { isOpen:"True",created_date:'',published_date:'',title:'',category:''}
  const [category_state, setCat] = useState(state)
  const[loading, setLoading] = useState(true);
  const {cat} = useParams()
  console.log(cat)
  useEffect(() => {
    getCategoryPostList(cat)
    .then(d => {
        setCat(d)
        setLoading(false)
    })
    .catch(e => {
        throw new Error(e)
    })
    },[cat])

  return (
    <div className={classes.root}>
      <Header />
      <Sidebar />
          {loading ?
                <></>
                :
          <PostList posts={category_state} title={cat}/>
      }
  </div>
);
}


export default FolderPostList;


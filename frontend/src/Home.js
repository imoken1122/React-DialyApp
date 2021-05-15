
import React,{useLayoutEffect,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Header from "./Header"
import Sidebar from './Sidebar';
import PostList from "./PostList"
import Post from "./Post"
import { withCookies } from 'react-cookie';
import {useParams} from "react-router-dom";
import {getPostList,getCategoryPostList} from "./api/getDialy"


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
  
  }));


export const loadContext =  React.createContext()
function Home(props){
  let {cat,id} = useParams()
  let [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true);
  let flag = cat == void 0
  useLayoutEffect(() => {
      const post = flag ? 
      getPostList(props.cookies.get("dialy-token")) 
      :
      getCategoryPostList(cat,props.cookies.get("dialy-token"))
      post.then(d => {
  
          console.log(d)
          setPosts(d)
          posts = d
          setLoading(false)

      })
      .catch(e => {
        return ( () => <p>Not Found</p>)
      })


    },[flag ? props.cookies : cat])
    console.log(posts)
  const classes = useStyles();


  return (
    <div className={classes.root}>
      <loadContext.Provider value={[posts,setPosts]}>
        <Header cookies={props.cookies} />
      </loadContext.Provider>
    {id == void 0 ? 
        <>
        <Sidebar cookies={props.cookies}/>
          {loading ? <></> :
          <PostList posts={posts} cat={flag ? "全記事" : cat}/>
          }
          </>
        :
        <Post id={id}/>
        }

  </div>
);
}


export default withCookies(Home);


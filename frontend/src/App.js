
import React from 'react';
import PostNew from "./PostNew"
import PostEditRoute from "./PostEditRoute"
import FolderPostList from "./FolderPostList"
import Post from "./Post"
import Home from "./Home"
import Login from "./auth/Login"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
const App = () => {  

    return(
      <div>
        <Router>
          <div>
            <Switch>
                <Route exact path='/login' component={Login} />
                <Route exact path='/posts' component={Home} />
                <Route exact path='/posts/:id' component={Post} />
                <Route exact path='/post/new' component = {PostNew} />
                <Route exact path='/post/edit/:id' component = {PostEditRoute} />
                <Route exact path='/posts/folder/:cat' component={FolderPostList}/>
                <Route render={() => <h4>Not Found 404</h4>} />
            </Switch>
          </div>
        </Router>
      </div>
    )  
  }


export default App;
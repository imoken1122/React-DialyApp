
import React from 'react';
import PostNew from "./PostNew"
import PostEditRoute from "./PostEditRoute"
import FolderPostList from "./FolderPostList"
import Post from "./Post"
import Home from "./Home"
import AuthView from "./auth/AuthView"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
const App = () => {  

    return(
      <div>
        <Router>
          <div>
            <Switch>
                <Route exact path='/' render={props => <AuthView bool={3} {...props}/>} />
                <Route exact path='/signin' render={props => <AuthView bool={1} {...props}/>} />
                <Route exact path='/signup' render={props => <AuthView bool={0} {...props}/>} />
           
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

import React from 'react';
import PostNew from "./PostNew"
import PostEditRoute from "./PostEditRoute"
import FolderPostList from "./FolderPostList"
import Post from "./Post"
import Home from "./Home"
import AuthView from "./auth/AuthView"
import { BrowserRouter as Router, Route, Switch,Redirect } from 'react-router-dom';
import { CookiesProvider, withCookies } from 'react-cookie';
import LoggedOut from './auth/LoggedOut';
import LoggedIn from './auth/LoggedIn';

const App = () => {  
    
    return(
      <div>
        <Router>
          <div>
            <CookiesProvider>
              <LoggedOut>
                    <Route exact path='/' render={props => <AuthView bool={3}{...props}/>} />
                    <Route exact path='/signin' render={props => <AuthView bool={1} {...props}/>} />
                    <Route exact path='/signup' render={props => <AuthView bool={0} {...props}/>} />
                    <Redirect to="/" /> 
                    
              </LoggedOut>
              <LoggedIn >
                <Switch>
                    <Route exact path={`/posts`} component={Home} />
                    <Route exact path={`/posts/:id`} component={Post} />
                    <Route exact path={`/post/new`} component={PostEditRoute} />
                    <Route exact path={`/post/edit/:id`} component={PostEditRoute} />
                    <Route exact path={`/posts/folder/:cat`} component={FolderPostList} />
                    {/*<Route exact path={`/${user.name}/posts`} render={props => <Home nameid={user.id} {...props} />} />
                    <Route exact path={`/${user.name}/posts/:id`} render={props => <Post nameid={user.id} {...props} />}/>
                    <Route exact path={`/${user.name}/post/new`} render={props => <PostNew nameid={user.id} {...props} />} />
                    <Route exact path={`/${user.name}/post/edit/:id`}  render={props => <PostEditRoute nameid={user.id} {...props} />} />
                    <Route exact path={`/${user.name}/posts/folder/:cat`} render={props => <FolderPostList nameid={user.id} {...props} />}/>
                    */}
                      <Route component={Home}/>
                </Switch>
               </LoggedIn>
            </CookiesProvider>
          </div>
        </Router>
        </div>
    )  
  }


export default withCookies(App);

import React,{useState} from 'react';
import PostNew from "./PostNew"
import PostEditRoute from "./PostEditRoute"
import FolderPostList from "./FolderPostList"
import Post from "./Post"
import Home from "./Home"
import AuthView from "./auth/AuthView"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { CookiesProvider, withCookies } from 'react-cookie';
import LoggedOut from './auth/LoggedOut';
import LoggedIn from './auth/LoggedIn';
const App = () => {  
    let [name, setName] = useState("")
    const updateName = (newname) => {
      setName(newname)
      name = newname
      console.log(name)
    }
    return(
        <Router>
          <div>
            <CookiesProvider>
              <LoggedIn>
                <Switch>
                    <Route exact path='/posts' component={Home} />
                    <Route exact path='/posts/:id' component={Post} />
                    <Route exact path='/post/new' component = {PostNew} />
                    <Route exact path='/post/edit/:id' component = {PostEditRoute} />
                    <Route exact path='/posts/folder/:cat' component={FolderPostList}/>
                    <Route component={Home} />
                </Switch>
              </LoggedIn>
                <LoggedOut>
                  <Switch>
                    <Route exact path='/' render={props => <AuthView bool={3} nameFunc={updateName} {...props}/>} />
                    <Route exact path='/signin' render={props => <AuthView bool={1} nameFunc={updateName} {...props}/>} />
                    <Route exact path='/signup' render={props => <AuthView bool={0} nameFunc={updateName} {...props}/>} />
                    <Route component={AuthView}/>
                  </Switch>
                </LoggedOut>
            </CookiesProvider>
          </div>
        </Router>
    )  
  }


export default withCookies(App);
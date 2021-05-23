import React from 'react';
import {Redirect, Route} from 'react-router-dom'

import Login from "./pages/Login";
import Register from "./pages/Register";
import TopBar from "./components/TopBar"
import PostForm from "./pages/PostForm";
import PostNew from "./pages/PostNew";
import Home from "./pages/Home";
import {UserProvider} from "./context/userContex";

export function App() {
    return (
        <UserProvider>
            <div className="App">
                <TopBar/>
                <Route path='/login' component={Login}/>
                <Route path='/register' component={Register}/>
                <Route exact path='/posts' component={Home}/>
                <Route path='/posts/:id' component={PostForm}/>
                <Route exact path='/post/new' component={PostNew}/>
                <Redirect to='/login'/>
            </div>
        </UserProvider>

    );
}

export default App;
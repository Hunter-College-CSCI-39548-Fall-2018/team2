import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './components/home'
import Goals from './components/goals';
import GoalFeed from './components/goalFeed';
import Login from './components/login';
import Register from './components/register'


const Routes = () => (
    <Router>
        <div>
            <Route exact path="/" component={Home}/>
            <Route path="/goals" component={Goals}/>
            <Route path="/feed" component={GoalFeed}/>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
        </div>
    </Router>
);

export default Routes;
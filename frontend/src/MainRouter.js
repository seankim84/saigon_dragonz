import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './core/Home';
import Signin from './user/Signin';
import Signup from './user/Signup';

export default class extends Component {
    render() {
        return (
            <div> 
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/signin" component={Signin} />
                    <Route exact path="/signup" component={Signup} />
                </Switch>
            </div>
        )
    }
}

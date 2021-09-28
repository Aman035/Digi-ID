import React, { Component } from 'react';
import {Switch,Route,Redirect,withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import Home from './home/home';
import Header from './header/header';

class Main extends Component{
    render(){

        // const PrivateRoute = ({ component: Component, ...rest }) => (
        //     <Route {...rest} render={(props) => (
        //       this.props.signin.signed
        //         ? <Component {...props} />
        //         : <Redirect to={{
        //             pathname: '/home',
        //             state: { from: props.location }
        //           }} />
        //     )} />
        // );

        return(
            <div className="main">
                <Header/>
                <Switch>
                    <Route path='/home' component={Home}/>
                    <Route path='/aboutapp' component={About}/>
                    <Redirect to='/home'/>
                </Switch>
            </div>
        )
    }
}

export default Main;


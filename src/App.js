import React, { Component } from 'react';
import './app.css';
import {Switch,Route,Redirect,withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import Home from './components/home/home';
import Header from './components/header/header';
import About from './components/about/about';
import {Button} from '@mui/material';
import {Link} from 'react-router-dom';
import {logout} from './redux/actions/auth';
const mapStateToProps = state => {
    return {
      Auth : state.Auth
    }
}
const mapDispatchToProps = (dispatch) => ({
    logout : () => dispatch(logout()),
  });

class App extends Component{
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
            <div>
                {!this.props.Auth.isAuthenticated?
                    <Button size="large"  
                    color="primary" 
                    className = "logoutBtn"
                    onClick = {this.props.logout} 
                    >
                        Log Out
                    </Button>
                :
                null}
                <Link to="/home">
                <img src="/assets/logo.png" alt="Logo" height="60px" width ="60px" className="logo"/>
                </Link>
                <Header/>
                <Switch>
                    <Route path='/home' component={Home}/>
                    <Route path='/about' component={About}/>
                    <Redirect to='/home'/>
                </Switch>
            </div>
        )
    }
}

export default withRouter(connect(mapStateToProps , mapDispatchToProps)(App));


import React, { Component } from 'react';
import './App.css';
import {Switch,Route,Redirect,withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import Home from './components/home/home';
import Header from './components/header/header';
import About from './components/about/about';
import Profile from './components/profile/profile';
import NewId from './components/profile/newid';
import Issuer from './components/issuer/profile';
import VerifyIssuer from './components/verifyIssuer/verify';
import AlertComp from './components/alert';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { authLogout } from './redux/actions/auth';
import Loading from './components/loading/loading';
import Identity from './components/profile/identity';
import { updateRequestInfo } from './redux/actions/issuerRequest';
import { updateIssuerInfo } from './redux/actions/issuer';

const mapStateToProps = state => {
    return {
      Auth : state.Auth,
      User : state.User
    }
}
const mapDispatchToProps = (dispatch) => ({
    logout : () => dispatch(authLogout()),
    updateIssuerInfo : () => dispatch(updateIssuerInfo()),
    updateRequestInfo : () => dispatch(updateRequestInfo())

  });

class App extends Component{

    componentDidMount(){
        this.props.updateIssuerInfo();
        this.props.updateRequestInfo();
    }

    render(){
        if(window.ethereum !== undefined && this.props.Auth.isAuthenticated){
            window.ethereum.on('accountsChanged', (accounts)=>{
                window.location.reload();
            });
        }

        const PrivateRoute = ({ component: Component, ...rest }) => (
            <Route {...rest} render={(props) => (
              this.props.Auth.isAuthenticated
                ? <Component {...props} />
                : <Redirect to={{
                    pathname: '/home',
                    state: { from: props.location }
                  }} />
            )} />
        );

        const SuperPrivateRoute = ({ component: Component, ...rest }) => (
            <Route {...rest} render={(props) => (
              this.props.Auth.isAuthenticated
                ? <Component {...props} />
                : <Redirect to={{
                    pathname: '/home',
                    state: { from: props.location }
                  }} />
            )} />
        );

        return(
            <div className="app">
                {this.props.Auth.loading?
                    <Loading/>
                :null
                }
                {this.props.Auth.isAuthenticated?
                    <Button size="large"  
                    color="primary" 
                    className = "logoutBtn"
                    onClick = {this.props.logout} 
                    >
                        <b>Log Out</b>
                    </Button>
                :
                null}
                <Link to="/home">
                <img src="/assets/logo.png" alt="Logo" height="60px" width ="60px" className="logo"/>
                </Link>
                <Header/>
                <div className="headingTab"></div>
                <Switch>
                    <Route path='/home' component={Home}/>
                    <Route path='/about' component={About}/>
                    <PrivateRoute path='/newid' component={NewId}/>
                    <PrivateRoute path='/profile' component={Profile}/>
                    <PrivateRoute path='/issuer' component={Issuer}/>
                    <PrivateRoute exact path = "/id/:num"  component={(props) =>{
                        return(
                        <Identity identity = {this.props.User.info.identity.filter( item =>item.num.toString() === props.match.params.num)[0]}/>
                        )}}/>
                        
                    <SuperPrivateRoute path='/verifyissuer' component={VerifyIssuer}/>
                    <Redirect to='/home'/>
                </Switch>
                <AlertComp className="alert"/>
                <div className="footer">Copyright @Decentra ID</div>
                </div>
        )
    }
}

export default withRouter(connect(mapStateToProps , mapDispatchToProps)(App));

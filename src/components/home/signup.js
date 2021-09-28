import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { Divider, makeStyles } from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';
import CancelIcon from '@material-ui/icons/Cancel';
const useStyles = makeStyles(theme => ({
  root: {
    borderRadius: 12,
    minWidth: 300,
    textAlign: 'center',
    padding: '30px',
    backgroundColor : '#393e46',
    height : 'fit-content',
    wordBreak : 'break-all'
  },
  header: {
    textAlign: 'center',
    spacing: 20,
    padding : '40px 0'
  },
  list: {
    padding: ' 40px 0',
  },
  button: {
    
    margin: '20px 0 0 0',
  },
  action: {
    display: 'flex',
    justifyContent: 'space-around',
  },
}));

export const SignUp = React.memo(function PricingCard(props) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
    <Button style={{position : 'absolute' , right : '0', top : '10'}} onClick={props.close}><CancelIcon/></Button>
      <CardHeader title="Account Details" className={classes.header} />
      <Divider variant="middle" />
      <CardContent>
        <Typography variant="h5" align="center">
          {props.account}
        </Typography>
        <div className={classes.list}>
          <Typography align="center">MetaMask Account Addess</Typography>
        </div>
      </CardContent>
      <Divider variant="middle" />
      <h6 style={{marginTop : "20px" ,color : 'white'}}>New User Account Detected</h6>
      <h6 style={{marginTop : "20px" ,color : 'white'}}>Create Account to experience a new way to manage your identity.</h6>
      <CardActions className={classes.action}>
        <Button variant="contained" color="primary" className={classes.button} onClick={props.createAccount}>
          Create Account
        </Button>
      </CardActions>
    </Card>
  );
});

export default SignUp;
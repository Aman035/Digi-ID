import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  Alert : state.Alert
}) 

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

//severity : success , error , warning , info
const AlertComp = (props)=> (
      <React.Fragment>
      {props.Alert.message != null?
      <Snackbar open={true}>
        <Alert severity={props.Alert.severity} sx={{ width: "100%" }}>
        {props.Alert.message}
        </Alert>
      </Snackbar>
      :
      null
      }
      </React.Fragment>
)
export default connect(mapStateToProps)(AlertComp);
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));
function AlertBar({ message }) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                {message} <strong>!!!</strong>
            </Alert>

        </div>
    )
}

export default AlertBar

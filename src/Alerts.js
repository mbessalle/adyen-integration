import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Alert, AlertTitle } from "@material-ui/lab";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function DescriptionAlerts(props) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.root}>
      {props.resultCode === "Refused" ? (
        <Alert
          onClose={() => {
            history.push('/')
            props.setResultCode("");
          }}
          severity="error"
        >
          <AlertTitle>Refused</AlertTitle>
          Payment refused, try the payment again using a different payment
          method or card.
        </Alert>
      ) : null}

      {props.resultCode === "Error" ? (
        <Alert
          onClose={() => {
            history.push('/')
            props.setResultCode("");
          }}
          severity="error"
        >
          <AlertTitle>Error</AlertTitle>
          There was an error handling your payment
        </Alert>
      ) : null}

      {props.resultCode === "Authorised" ? (
        <Alert
          onClose={() => {
            history.push('/')
            props.setResultCode("");
          }}
          severity="success"
        >
          <AlertTitle>Success</AlertTitle>
          The payment was successful!
        </Alert>
      ) : null}
    </div>
  );
}

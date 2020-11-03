import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Alert, AlertTitle } from "@material-ui/lab";

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

  return (
    <div className={classes.root}>
      {props.resultCode === "Refused" ? (
        <Alert severity="error">
          <AlertTitle>Refused</AlertTitle>
          Payment refused, try the payment again using a different payment
          method or card.
        </Alert>
      ) : null}

      {props.resultCode === "Error" ? (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          There was an error handling your payment
        </Alert>
      ) : null}

      {props.resultCode === "Authorised" ? (
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          The payment was successful!
        </Alert>
      ) : null}
    </div>
  );
}

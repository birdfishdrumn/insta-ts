import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  button: {
    backgroundColor: "#ffffff",
    color: "#000",
    fontSize: 14,
    height: 38,
    marginButton: 20,
    width: 200,
    marginTop: 20,
  },
});
const NormalButton = (props) => {
  const classes = useStyles();
  return (
    <Button
      className={classes.button}
      variant="contained"
      disabled={props.disabled}
      onClick={() => props.onClick()}
    >
      {props.label}
    </Button>
  );
};

export default NormalButton;

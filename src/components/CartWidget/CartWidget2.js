import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Badge } from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: "7rem",
  },
  appBar: {
    backgroundColor: "whitesmoke",
    boxShadow: "none",
  },
  grow: {
    flexGrow: 1,
  },
  button: {
    marginLeft: theme.spacing(2),
  },
  image: {
    marginRight: "10px",
    height: "1rem",
  },
}));

export default function CartWidget2() {
  const classes = useStyles();

  return (
    <div className={classes.button}>
      <Button variant="outlined">
        <strong>Sign In</strong>
      </Button>
      <IconButton aria-label="show-cart-items" color="inherit">
        <Badge badgeContent={2} color="secondary">
          <ShoppingCart fontSize="large" color="primary" />
        </Badge>
      </IconButton>
    </div>
  );
}

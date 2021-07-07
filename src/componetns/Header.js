import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function Header(props) {
  const [ethAddress, setethAddress] = useState("Login");
  const [messageValue, setmessageValue] = useState("");
  const ethereum = window.ethereum;

  const enableMetaMask = async () => {
    await ethereum.request({ method: "eth_requestAccounts" });
    console.log(ethereum.selectedAddress);
    setethAddress(ethereum.selectedAddress);
  };

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = async () => {
    await enableMetaMask();

    const delayInMilliseconds = 1000;

    setTimeout(function () {
      setOpen(true);
    }, delayInMilliseconds);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const mesgValueChangeHandler = (event) => {
    setmessageValue(event.target.value);
    // console.log(event.target.value);
  };

  const submitHandle = () => {
    const postData = {
      ethaddress: ethereum.selectedAddress,
      msgValue: messageValue,
    };

    props.onPostData(postData);
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={handleClickOpen}
          >
            <AddCircleOutlineIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            MESSAGE BOARD
          </Typography>
          <Button color="inherit" onClick={enableMetaMask}>
            {ethAddress}
          </Button>
        </Toolbar>
      </AppBar>
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">New Post</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter the message that you want to post to message board.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="mesgValue"
              label="Message"
              onChange={mesgValueChangeHandler}
              multiline
              type="input"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={submitHandle} color="primary">
              Post
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default Header;

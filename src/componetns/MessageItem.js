import React from "react";

import { makeStyles } from '@material-ui/core/styles';
import { deepOrange, blue } from '@material-ui/core/colors';
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  blue: {
    color: theme.palette.getContrastText(blue[500]),
    backgroundColor: blue[500],
  },
}));

function MessageItem(props) {
  const classes = useStyles();
  let userType = classes.orange;
  let userSymbol = "S"

  console.log(props.userType)

  if(props.userType) {
    userType = classes.blue;
    userSymbol = "T"
  }  
  
  return (
    <div>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar className={userType}>{userSymbol}</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={props.value}
          secondary={
            <React.Fragment>
              {props.ethaddress}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider />
    </div>
  );
}

export default MessageItem;

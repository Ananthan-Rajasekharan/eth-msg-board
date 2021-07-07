import "./App.css";
import React, { useState, useEffect } from "react";

import Web3 from "web3";

import Header from "./componetns/Header";
import MessageItem from "./componetns/MessageItem";
import Footer from "./componetns/footer";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const DUMMY_POSTS = [
  {
    ethaddress: "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
    msgValue:
      "More than half of the financing comes from the International Development Association",
  },
  {
    ethaddress: "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
    msgValue:
      "That Time I Got Reincarnated as a Slime - Episode 37 [English Sub]",
  },
  {
    ethaddress: "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
    msgValue: "Beyond Console Log in 100 Seconds",
  },
];

function App() {
  const ethereum = window.ethereum;

  const [txHash, setTxHash] = useState("");

  const [initialPosts, setinitialPosts] = useState("");

  const MyContractJSON = require("./contractjson/MsgBoard.json");

  const web3 = new Web3(ethereum);
  const contractAddress = MyContractJSON.networks["5777"].address;
  const contractAbi = MyContractJSON.abi;

  const myContract = new web3.eth.Contract(contractAbi, contractAddress);

  useEffect(() => {
    getInitialPosts();
  }, []);

  const getInitialPosts = async () => {
    const postCount = await myContract.methods.getCount().call();

    console.log("Post No: ", postCount);

    for (let i = 0; i < postCount; i++) {
      let post = await myContract.methods.posts(0).call();

      setinitialPosts((prevPosts) => {
        return [{ethaddress: post.ethaddress, msgValue: post.msgValue}, ...prevPosts];
      });

    }

    console.log(initialPosts);
  };

  const [posts, setPosts] = useState(DUMMY_POSTS);

  const [open, setOpen] = React.useState(false);

  const postDataHandler = async (enteredpostValue) => {
    const infoValue = await myContract.methods
      .newPost(enteredpostValue.ethaddress, enteredpostValue.msgValue)
      .send({ from: ethereum.selectedAddress });

    setTxHash(infoValue.transactionHash);

    setPosts((prevPosts) => {
      return [enteredpostValue, ...prevPosts];
    });

    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div className="App">
      <Header onPostData={postDataHandler} />
      <br />
      <br />
      <br />
      {posts.map((value, index) => (
        <MessageItem
          key={index}
          ethaddress={value.ethaddress}
          value={value.msgValue}
        />
      ))}
      <br />
      <Footer />

      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Post Added, Tx Hash: {txHash}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;

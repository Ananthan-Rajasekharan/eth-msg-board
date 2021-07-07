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

function App() {
  const ethereum = window.ethereum;

  const [txHash, setTxHash] = useState("");

  // const [initialPosts, setinitialPosts] = useState("");

  const MyContractJSON = require("./contractjson/MsgBoard.json");

  const web3 = new Web3(ethereum);
  const contractAddress = "0x0721cF6A7a106DFd31f8521597aED7f1d50169A9";
  const contractAbi = MyContractJSON.abi;

  const myContract = new web3.eth.Contract(contractAbi, contractAddress);

  useEffect(() => {
    getInitialPosts();
  }, []);

  const [posts, setPosts] = useState([]);

  const getInitialPosts = async () => {
    const postCount = await myContract.methods.getCount().call();

    console.log("Post No: ", postCount);

    let initialPosts = [];

    for (let i = 0; i < postCount; i++) {
      let post = await myContract.methods.posts(i).call();
      let newPost = {ethaddress: post.ethaddress, msgValue: post.msgValue, userType: post.userType}

      initialPosts.push(newPost)
    }

    console.log(initialPosts);

    setPosts(initialPosts.reverse());
  };

  

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
          userType={value.userType}
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

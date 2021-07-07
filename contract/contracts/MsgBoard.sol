// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.1;

contract MsgBoard {
    
    struct post {
        address ethaddress;
        string msgValue;
        bool userType;
    }
    
    mapping(address => bool) teachOrNot;
    
    post[] public posts;
    
    function newPost(address ethaddress, string memory msgValue) public {
        posts.push(post(ethaddress, msgValue, teachOrNot[ethaddress]));
    }
    
    function getCount() view public returns(uint) {
        return posts.length;
    }
}
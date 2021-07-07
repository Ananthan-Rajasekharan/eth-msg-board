const MsgBoard = artifacts.require("MsgBoard");

module.exports = function (deployer) {
  deployer.deploy(MsgBoard);
};

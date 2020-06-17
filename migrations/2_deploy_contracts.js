const wesCoin = artifacts.require("./wesCoin.sol");

module.exports = function(deployer) {
  deployer.deploy(wesCoin, 1000000);
};

const wesCoin = artifacts.require("./wesCoin.sol");
const wesCoinSale = artifacts.require("./wesCoinSale.sol");


module.exports = function(deployer) {
   deployer.deploy(wesCoin,1000000).then(function() {
      var tokenPrice = 1000000000000000;
      return deployer.deploy(wesCoinSale, wesCoin.address, tokenPrice);
   });
};

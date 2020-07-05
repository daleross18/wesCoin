var wesCoin = artifacts.require("./wesCoin.sol");
var wesCoinSale = artifacts.require("./wesCoinSale.sol");


contract('wesCoinSale', function(accounts) {
   var tokenInstance;
   var tokenSaleInstance;
   var admin = accounts[0];
   var buyer = accounts[1];
   var tokenPrice = 1000000000000000; //in wei
   var tokensAvailable = 750000;
   var numberOfTokens;

   it('initializes the contract with the correct values', function() {
      return wesCoinSale.deployed().then(function(instance) {
         tokenSaleInstance = instance;
         return tokenSaleInstance.address
      }).then(function(address) {
         assert.notEqual(address, 0x0, 'has contract address');
         return tokenSaleInstance.tokenContract();
      }).then(function(address) {
         assert.notEqual(address, 0x0, 'has token contract address');
         return tokenSaleInstance.tokenPrice();
      }).then(function(price) {
         assert.equal(price, tokenPrice, 'token price is correct');
      });
   });

   it ('facilitates token buying', function() {
      return wesCoin.deployed().then(function(instance) {
         //Grab token instance first
         tokenInstance = instance;
         return wesCoinSale.deployed();
      }).then(function(instance) {
         // Then grab token sale instance
         tokenSaleInstance = instance;
         //Provision 75% of all tokens to sale
         return tokenInstance.transfer(tokenSaleInstance.address, tokensAvailable, { from : admin })
      }).then(function(receipt) {
         numberOfTokens = 10;
         return tokenSaleInstance.buyTokens(numberOfTokens, { from: buyer, value: numberOfTokens * tokenPrice})
      }).then(function(receipt) {
         assert.equal(receipt.logs.length, 1, 'triggers one event');
         assert.equal(receipt.logs[0].event, 'Sell', 'should be the "Sell" event');
         assert.equal(receipt.logs[0].args._buyer, buyer, 'logs the account that purchased the tokens');
         assert.equal(receipt.logs[0].args._amount, numberOfTokens, 'logs the number of tokens purchased');
         return tokenSaleInstance.tokensSold();
      }).then(function(amount) {
         assert.equal(amount.toNumber(), numberOfTokens, 'increments the number of tokens sold');
         return tokenInstance.balanceOf(buyer);
      }).then(function(balance) {
         assert.equal(balance.toNumber(), numberOfTokens);
         return tokenInstance.balanceOf(tokenSaleInstance.address);
      }).then(function(balance) {
         assert.equal(balance.toNumber(), tokensAvailable - numberOfTokens);
         return tokenSaleInstance.buyTokens(numberOfTokens, { from: buyer, value: 1 });
      }).then(assert.fail).catch(function(error) {
         assert(error.message, 'msg.value must equal amount of tokens in wei');                  return tokenSaleInstance.buyTokens(numberOfTokens, { from: buyer, value: 1 });
         return tokenSaleInstance.buyTokens(800000, { from: buyer, value: numberOfTokens * tokenPrice });
      }).then(assert.fail).catch(function(error) {
         assert(error.message, 'cannot purchase more tokens than available');
      });
   });

   it('ends token sale', function() {
      return wesCoin.deployed().then(function(instance) {
         tokenInstance = instance;
         return wesCoinSale.deployed();
      }).then(function(instance) {
         // Then grab token sale instance
         tokenSaleInstance = instance;
         return tokenSaleInstance.endSale({ from: buyer});
      }).then(assert.fail).catch(function(error) {
         assert(error.message, 'must be admin to end sale');
         return tokenSaleInstance.endSale({ from: admin});
      }).then(function(receipt) {
         return tokenInstance.balanceOf(admin);
      }).then(function(balance) {
         assert.equal(balance.toNumber(), 999990, 'return all unsold wesCoin to admin');
         return web3.eth.getBalance(tokenSaleInstance.address)
      }).then(function(balance) {
         assert.equal(balance, 0);
      });
   });

});

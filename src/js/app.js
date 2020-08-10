App = {
   web3Provider: null,
   contracts: {};
   init: function() {
      console.log("App initialized...")
      return App.initWeb3();
   },

   initWeb3 : function() {
      if (typeof web3 !== 'undefined') {
         // If a web3 instance is already provided by Meta Mask.
         App.web3Provider = web3.currentProvider;
         web3 = new Web3(web3.currentProvider);
       } else {
         // Specify default instance if no web3 instance provided
         App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
         web3 = new Web3(App.web3Provider);
      }
   },

   initContracts: function() {
      $.getJSON("wesCoinSale.json", function(wesCoinSale) {
         App.contracts.wesCoinSale = TruffleContract(wesCoinSale);
         App.contracts.wesCoinSale.setProvider(App.web3Provider);
         App.contracts.wesCoinSale.deployed().then(function(wesCoinSale){
            console.log("wesCoin Sale Address:", wesCoinSale.address);
         });
      })
   }
}

$(function() {
   $(window).on('load', function() {
      App.init();
   })
});

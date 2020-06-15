pragma solidity >=0.4.21 <0.7.0;

contract DappToken {
   //Contructor: W
   // way to set the total num of tokens
   // wau to read total number of tokens
   uint256 public totalSupply;

    constructor () public {
      totalSupply= 1000000;
   }
}

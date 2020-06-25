pragma solidity >=0.4.21 <0.7.0;

import "./wesCoin.sol";

contract wesCoinSale {
   address admin;
   wesCoin public tokenContract;
   uint256 public tokenPrice;

   constructor (wesCoin _tokenContract, uint256 _tokenPrice) public {
      admin = msg.sender;
      tokenContract = _tokenContract;
      tokenPrice = _tokenPrice;
   }
}

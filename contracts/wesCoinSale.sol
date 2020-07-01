pragma solidity >=0.4.21 <0.7.0;

import "./wesCoin.sol";

contract wesCoinSale {
   address admin;
   wesCoin public tokenContract;
   uint256 public tokenPrice;
   uint256 public tokensSold;

   event Sell(
      address _buyer,
      uint256 _amount
      );

   constructor (wesCoin _tokenContract, uint256 _tokenPrice) public {
      admin = msg.sender;
      tokenContract = _tokenContract;
      tokenPrice = _tokenPrice;
   }

   function multiply(uint x, uint y) internal pure returns (uint z) {
      require(y == 0 || (z = x * y) / y == x, '');
   }

   function buyTokens(uint256 _numberOfTokens) public payable {

      require(msg.value == multiply(_numberOfTokens, tokenPrice), 'msg.value must equal amount of tokens in wei');



      tokensSold += _numberOfTokens;

      emit Sell(msg.sender, _numberOfTokens);

   }
}

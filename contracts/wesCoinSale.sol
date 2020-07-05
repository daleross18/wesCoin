pragma solidity >=0.4.21 <0.7.0;

import "./wesCoin.sol";

contract wesCoinSale {
   address payable admin;
   wesCoin public tokenContract;
   uint256 public tokenPrice;
   uint256 public tokensSold;

   event Sell(
      address _buyer,
      uint256 _amount
      );

   event EndSale(
      uint256 _totalAmountSold
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

      require(tokenContract.balanceOf(address(this)) >= _numberOfTokens, 'cannot transfer more than number of tokens available');

      require(tokenContract.transfer(msg.sender, _numberOfTokens), '');


      tokensSold += _numberOfTokens;

      emit Sell(msg.sender, _numberOfTokens);
   }

   function endSale() public {

      require(msg.sender == admin, 'must be admin to end sale');
      require(tokenContract.transfer(admin, tokenContract.balanceOf(address(this))));


      admin.transfer(address(this).balance);


      emit EndSale(tokensSold);

   }


}

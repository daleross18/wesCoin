pragma solidity >=0.4.21 <0.7.0;

contract wesCoin {
   string public name = "wesCoin";
   string public symbol = "WES";
   string public standard = "wesCoin v1.0";
   uint256 public totalSupply;

   event Transfer(
      address indexed _from,
      address indexed _to,
      uint256 _value
   );

   mapping(address => uint256) public balanceOf;

   constructor (uint256 _initialSupply) public {
      balanceOf[msg.sender] = _initialSupply;
      totalSupply = _initialSupply;
      //allocate the initial supply

   }
   //transfer function

   function transfer (address _to, uint256 _value) public returns (bool success) {
      require(balanceOf[msg.sender] >= _value, '');
      //transfer balance
      balanceOf[msg.sender] -= _value;
      balanceOf[_to] += _value;
      //return boolean
      emit Transfer(msg.sender, _to, _value);

      return true;
      //trigger transfer event

   }

}

pragma solidity '0.5.17';

contract Tether {
    string public name = "Tether";
    string public symbol = "USTD";
    uint256 public totalSupply = 1000000000000000000;
    uint8 public decimals = 18;

    event Transfer(
        address indexed _from,
        address indexed _to,
        uint _amount
    );

    event Approve(
        address indexed _owner,
        address indexed _spender,
        uint _amount
    );

    mapping(address => uint256) balanceOf;

    constructor() {
        balanceOf[msg.sender] = totalSupply;
    }

    function transfer(address _to, uint256 _amount) public returns(bool success) {
        require(balanceOf[msg.sender] >= _amount);
        balanceOf[msg.sender] -= _amount;
        balanceOf[_to] += _amount;
        emit Transfer(msg.sender, _to, _amount);
        return true;
    }
}
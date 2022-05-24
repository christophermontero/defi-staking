pragma solidity '0.5.17';

import "./Tether.sol";

contract Reward {
    string public name = "Reward token";
    Tether public tether;
    string public symbol = "RWD";
    uint256 public totalSupply = 1000000000000000000000000; // 1 million USDT
    uint8 public decimals = 18;
    mapping(address => uint256) public balanceOf;
    
    event Transfer(
        address indexed _from,
        address indexed _to,
        uint _amount
    );

    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint _amount
    );

    constructor(Tether _tether ) public {
        balanceOf[msg.sender] = totalSupply;
        tether = _tether;
    }

    function transfer(address _to, uint256 _amount) public returns(bool success) {
        require(balanceOf[msg.sender] >= _amount);
        balanceOf[msg.sender] -= _amount;
        balanceOf[_to] += _amount;
        emit Transfer(msg.sender, _to, _amount);
        return true;
    }

    function claim() public {
        uint reward = balanceOf[msg.sender];
        require(balanceOf[msg.sender] > 0, "reward balance can not be less than 0");
        tether.transferReward(msg.sender, reward);
        balanceOf[msg.sender] -= reward;
    }
}

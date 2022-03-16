pragma solidity '0.5.17';

import "./Reward.sol";
import "./Tether.sol";

contract DeBank {
    address public owner;
    string public name = "DeBank";
    Tether public tether;
    Reward public reward;

    address[] public stakers;

    mapping(address => uint) public stakingBalances;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaked;

    constructor(Reward _reward, Tether _tether) public {
        tether = _tether;
        reward = _reward;
    }

    function depositTokens(uint _amount) public {
        require(_amount > 0, "The amount can not be zero");

        tether.transferFrom(msg.sender, address(this), _amount);
        stakingBalances[msg.sender] += _amount;

        if(!hasStaked) {
            stakers.push(msg.sender);
        }

        isStaked[msg.sender] = true;
        hasStaked[msg.sender] = true;
    }
}
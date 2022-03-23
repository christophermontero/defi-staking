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
    mapping(address => bool) public isStaking;

    constructor(Reward _reward, Tether _tether) public {
        owner = msg.sender;
        tether = _tether;
        reward = _reward;
    }

    modifier onlyOwner {
        require(msg.sender == owner, "caller must be the owner");
        _;
    }

    function depositTokens(uint _amount) public {
        require(_amount > 0, "The amount can not be zero");
        tether.transferFrom(msg.sender, address(this), _amount);
        stakingBalances[msg.sender] += _amount;
        if(!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }
        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;
    }

    function unstakeTokens() public {
        uint balance = stakingBalances[msg.sender];
        require(stakingBalances[msg.sender] > 0, "staking balance can not be less than 0");
        tether.transfer(msg.sender, balance);
        stakingBalances[msg.sender] -= balance;
        isStaking[msg.sender] = false;
    }

    function issueTokens() public onlyOwner {
        for (uint i=0; i<stakers.length; i++) {
            address recipient = stakers[i];
            uint balance = stakingBalances[recipient] / 9; // Incentive is equal to one ninth
            if (balance > 0) {
                reward.transfer(recipient, balance);
            }
        }
    }
}
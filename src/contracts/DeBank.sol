pragma solidity '0.5.17';

import './Reward';
import './Tether';

contract DeBank {
    address public owner;
    string public name = "DeBank";
    Tether public tether;
    Reward public reward;

    constructor(Reward _reward, Tether _tether) public {
        tether = _tether;
        reward = _reward;
    }
}
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

    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint _amount
    );

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

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

    function approve(address _spender, uint256 _amount) public returns(bool success){
        allowance[msg.sender][_spender] = _amount;
        
        return true;
    }

    function transferFrom(address _from, address _to, uint256 _amount) public returns(bool success) {
        require(balanceOf[_from] >= _amount);
        require(allowance[_from][msg.sender] >= _amount);

        balanceOf[_from] -= _amount;
        balanceOf[_to] += _amount;
        allowance[msg.sender][_from] -= _amount;

        emit Transfer(_from, _to, _amount);

        return true;
    }
}
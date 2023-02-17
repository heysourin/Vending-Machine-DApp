// SPDX-License-Identifier:MIT
pragma solidity ^0.8.17;

contract VendingMachine {
    address public owner;
    mapping(address => uint256) public dounutBalance;

    constructor() {
        owner = msg.sender;
        dounutBalance[address(this)] = 100;
    }

    function getDonutBalance() public view returns (uint256) {
        return dounutBalance[address(this)];
    }

    function getOwnedDonuts(address user) external view returns (uint256) {
        return dounutBalance[user];
    }

    function restock(uint _amount) public {
        require(msg.sender == owner, "Only owner can restock");
        dounutBalance[address(this)] += _amount;
    }

    function purchase(uint _amount) public payable {
        require(msg.value > _amount * 0.001 ether, "Costs 0.001 ether/ donut");
        require(
            dounutBalance[address(this)] >= _amount,
            "Donut is out of stock"
        );
        dounutBalance[address(this)] -= _amount;
        dounutBalance[msg.sender] += _amount;
    }
}

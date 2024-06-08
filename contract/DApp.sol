// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <=0.8.25;

contract DApp {

    string private nameOwner = "AHMED";

    address owner;

    constructor() {
        owner = msg.sender;
    }

    modifier Owner() {
        require(msg.sender == owner, "You Are Not Owner");
        _;
    }

    function getOwnerName() public view returns(string memory) {
        return nameOwner;
    }

    function setOwnerName(string memory _name) public Owner() {
        nameOwner = _name;
    }

    function getOwnerAddress() public view returns(address) {
        return owner;
    }

    function payContract() public payable {}

    function getContractBalance() public view returns(uint256) {
        return address(this).balance;
    }

    function withdraw() public Owner() {
        payable(msg.sender).transfer(address(this).balance);
    }

}
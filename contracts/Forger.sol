// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./TToken.sol";

contract Forger is Ownable {
    TToken private myToken;
    uint constant BASIC_TOKEN_ID_0 = 0;
    uint constant BASIC_TOKEN_ID_1 = 1;
    uint constant BASIC_TOKEN_ID_2 = 2;

    uint constant DERIVED_TOKEN_ID_3 = 3;
    uint constant DERIVED_TOKEN_ID_4 = 4;
    uint constant DERIVED_TOKEN_ID_5 = 5;
    uint constant DERIVED_TOKEN_ID_6 = 6;

    uint constant FIXED_AMOUNT = 1;
    //uint256 constant STAKING_TIME = 60 seconds;
    mapping(address => uint256) private mintingTimestamp;
    constructor(address _myToken) {
        myToken = TToken(_myToken);
    }

    // mint basic
    function mintBasic(uint id) external {
        require(id == BASIC_TOKEN_ID_0 || id == BASIC_TOKEN_ID_1 || id == BASIC_TOKEN_ID_2, "Id could only be 0, 1 or 2");
        require(mintingTimestamp[msg.sender] < block.timestamp, "Minting timeout hasn't passed yet");
        // handle timeout of 1 minute
        myToken.mint(msg.sender, id, FIXED_AMOUNT, "");
        mintingTimestamp[msg.sender] = block.timestamp;// + STAKING_TIME;
    }

    // forge
    function forge(bool t0, bool t1, bool t2) external {
        if(t0 && t1 && t2) {
            require(myToken.balanceOf(msg.sender, BASIC_TOKEN_ID_0) > 0);
            require(myToken.balanceOf(msg.sender, BASIC_TOKEN_ID_1) > 0);
            require(myToken.balanceOf(msg.sender, BASIC_TOKEN_ID_2) > 0);
            myToken.setApprovalForAll(msg.sender, address(this), true);
            myToken.burn(msg.sender, BASIC_TOKEN_ID_0, FIXED_AMOUNT);
            myToken.burn(msg.sender, BASIC_TOKEN_ID_1, FIXED_AMOUNT);
            myToken.burn(msg.sender, BASIC_TOKEN_ID_2, FIXED_AMOUNT);
            myToken.mint(msg.sender, DERIVED_TOKEN_ID_6, FIXED_AMOUNT, "");
        } else if(t0 && t1) {
            require(myToken.balanceOf(msg.sender, BASIC_TOKEN_ID_0) > 0);
            require(myToken.balanceOf(msg.sender, BASIC_TOKEN_ID_1) > 0);
            myToken.setApprovalForAll(msg.sender, address(this), true);
            myToken.burn(msg.sender, BASIC_TOKEN_ID_0, FIXED_AMOUNT);
            myToken.burn(msg.sender, BASIC_TOKEN_ID_1, FIXED_AMOUNT);
            myToken.mint(msg.sender, DERIVED_TOKEN_ID_3, FIXED_AMOUNT, "");
        } else if(t1 && t2) {
            require(myToken.balanceOf(msg.sender, BASIC_TOKEN_ID_1) > 0);
            require(myToken.balanceOf(msg.sender, BASIC_TOKEN_ID_2) > 0);
            myToken.setApprovalForAll(msg.sender, address(this), true);
            myToken.burn(msg.sender, BASIC_TOKEN_ID_1, FIXED_AMOUNT);
            myToken.burn(msg.sender, BASIC_TOKEN_ID_2, FIXED_AMOUNT);
            myToken.mint(msg.sender, DERIVED_TOKEN_ID_4, FIXED_AMOUNT, "");
        } else if(t0 && t2) {
            require(myToken.balanceOf(msg.sender, BASIC_TOKEN_ID_0) > 0);
            require(myToken.balanceOf(msg.sender, BASIC_TOKEN_ID_2) > 0);
            myToken.setApprovalForAll(msg.sender, address(this), true);
            myToken.burn(msg.sender, BASIC_TOKEN_ID_0, FIXED_AMOUNT);
            myToken.burn(msg.sender, BASIC_TOKEN_ID_2, FIXED_AMOUNT);
            myToken.mint(msg.sender, DERIVED_TOKEN_ID_5, FIXED_AMOUNT, "");
        }
    }

    // burn derived
    function burnDerived(uint id) external {
        require(id == DERIVED_TOKEN_ID_3 || id == DERIVED_TOKEN_ID_4 || id == DERIVED_TOKEN_ID_5 || id == DERIVED_TOKEN_ID_6, "Id could only be one of 3,4,5,6");
        myToken.setApprovalForAll(msg.sender, address(this), true);
        myToken.burn(msg.sender, id, FIXED_AMOUNT);
    }

    // trade
    function tradeDerived(uint idIn, uint idOut) external {
        require(idIn == DERIVED_TOKEN_ID_3 || idIn == DERIVED_TOKEN_ID_4 || idIn == DERIVED_TOKEN_ID_5 || idIn == DERIVED_TOKEN_ID_6, "Idin could only be one of 3,4,5,6");
        require(idOut == BASIC_TOKEN_ID_0 || idOut == BASIC_TOKEN_ID_1 || idOut == BASIC_TOKEN_ID_2, "IdOut could only be 0, 1 or 2");
        myToken.setApprovalForAll(msg.sender, address(this), true);
        myToken.burn(msg.sender, idIn, FIXED_AMOUNT);
        myToken.mint(msg.sender, idOut, FIXED_AMOUNT, "");
    }
}
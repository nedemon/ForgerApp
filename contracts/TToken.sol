// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TToken is ERC1155, ERC1155Burnable, Ownable {
    address private minter;
    constructor() ERC1155("") {}
    function setMinter(address _minter) external onlyOwner {
        minter = _minter;
    }
    function mint(address account, uint256 id, uint256 amount, bytes memory)
        external         
    {
        require(msg.sender == minter, "only minter contract is allowed to mint");
        _mint(account, id, amount, "");
    }

    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        external
        onlyOwner
    {
        _mintBatch(to, ids, amounts, data);
    }

    function setApprovalForAll(address, bool) public virtual override {
        //_setApprovalForAll(_msgSender(), operator, approved);
        revert("disabled");
    }
    function setApprovalForAll(address owner, address operator, bool approved) external {
        require(msg.sender == minter, "only minter contract is allowed to approve");
        _setApprovalForAll(owner, operator, approved);
    }
}
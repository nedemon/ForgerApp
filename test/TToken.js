const {
    time,
    loadFixture,
  } = require("@nomicfoundation/hardhat-network-helpers");
  const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
  const { expect } = require("chai");

  describe("TToken", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    async function deployOneYearLockFixture() {
  
      // Contracts are deployed using the first signer/account by default
      const [owner, otherAccount] = await ethers.getSigners();
  
      const TToken = await ethers.getContractFactory("TToken");
      const token = await TToken.deploy();
  
      return { token, owner, otherAccount };
    }
  
    describe("Deployment", function () {
      it("Should deploy successfully", async function () {
        const { token, owner, otherAccount } = await loadFixture(deployOneYearLockFixture);
        
        await expect(token.mint(owner.address, 0, 1, [])).to.be.revertedWith("only minter contract is allowed to mint");
        await expect(token["setApprovalForAll(address,address,bool)"](owner.address, otherAccount.address, true)).to.be.reverted

        let tx = await token.setMinter(owner.address)
        await tx.wait()
        tx = await token.mint(owner.address, 0, 1, [])
        await tx.wait()
        const bnOne = ethers.BigNumber.from("1");
        expect(await token.balanceOf(owner.address, 0)).to.equal(bnOne)

        tx = await token.mintBatch(owner.address, [1], [1], [])
        await tx.wait()
        expect(await token.balanceOf(owner.address, 1)).to.equal(bnOne)

        await expect(token["setApprovalForAll(address,address,bool)"](owner.address, otherAccount.address, true)).not.to.be.reverted
        await expect(token["setApprovalForAll(address,bool)"](owner.address, true)).to.be.reverted
        
      });
  
    });
  });
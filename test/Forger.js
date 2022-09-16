const {
    time,
    loadFixture,
  } = require("@nomicfoundation/hardhat-network-helpers");
  const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
  const { expect } = require("chai");

  describe("Forger", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    async function deployOneYearLockFixture() {
  
      // Contracts are deployed using the first signer/account by default
      const [owner, otherAccount] = await ethers.getSigners();
  
      const TToken = await ethers.getContractFactory("TToken");
      const token = await TToken.deploy();
      const Forger = await ethers.getContractFactory("Forger");
      const forger = await Forger.deploy(token.address);
  
      return { token, forger, owner, otherAccount };
    }
  
    describe("Deployment", function () {
      it("Should deploy successfully", async function () {
        const { token, forger, owner, otherAccount } = await loadFixture(deployOneYearLockFixture);
        
        await expect(forger.mintBasic(99)).to.be.revertedWith(
            "Id could only be 0, 1 or 2"
        )

        let tx = await token.setMinter(forger.address)
        await tx.wait()

        tx = await forger.forge(false, false, false)
        await tx.wait()

        await expect(forger.forge(true, true, true)).to.be.reverted;
        await expect(forger.forge(true, true, false)).to.be.reverted;
        await expect(forger.forge(true, false, true)).to.be.reverted;
        await expect(forger.forge(false, true, true)).to.be.reverted;
        await expect(forger.burnDerived(1)).to.be.revertedWith("Id could only be one of 3,4,5,6");
        await expect(forger.tradeDerived(9,9)).to.be.revertedWith("Idin could only be one of 3,4,5,6");
        await expect(forger.tradeDerived(6,9)).to.be.revertedWith("IdOut could only be 0, 1 or 2");

        tx = await forger.mintBasic(0)
        await tx.wait()
        tx = await forger.mintBasic(1)
        await tx.wait()
        tx = await forger.mintBasic(2)
        await tx.wait()
        tx = await forger.forge(true, true, true)
        await tx.wait()

        tx = await forger.burnDerived(6)
        await tx.wait()

        tx = await forger.mintBasic(0)
        await tx.wait()
        tx = await forger.mintBasic(1)
        await tx.wait()
        tx = await forger.forge(true, true, false)
        await tx.wait()

        tx = await forger.mintBasic(1)
        await tx.wait()
        tx = await forger.mintBasic(2)
        await tx.wait()
        tx = await forger.forge(false, true, true)
        await tx.wait()

        tx = await forger.mintBasic(0)
        await tx.wait()
        tx = await forger.mintBasic(2)
        await tx.wait()
        tx = await forger.forge(true, false, true)
        await tx.wait()
        
        tx = await forger.tradeDerived(3, 0)
        await tx.wait()

        await expect(forger.mintBasic(99)).to.be.revertedWith(
            "Id could only be 0, 1 or 2"
        )
      });
    });
  });
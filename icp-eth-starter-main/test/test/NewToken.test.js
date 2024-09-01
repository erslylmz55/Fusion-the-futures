const NewToken = artifacts.require("NewToken");

contract("NewToken", accounts => {
  it("should mint new tokens after fusion", async () => {
    const instance = await NewToken.deployed();
    const initialSupply = await instance.totalSupply();
    
    // Mint new tokens
    await instance.mintNewTokenAfterFusion(accounts[1], 1000, { from: accounts[0] });

    const newSupply = await instance.totalSupply();
    assert.equal(newSupply.toNumber(), initialSupply.toNumber() + 1000, "Total supply did not increase by 1000");
  });
});

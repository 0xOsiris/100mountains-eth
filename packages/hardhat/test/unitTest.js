const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("YourCollectible", function () {
  it("Should return the new greeting once it's changed", async function () {
    const YourCollectible = await ethers.getContractFactory("YourCollectible");
    const yourcollectible = await YourCollectible.deploy(bytes32Array);
    await yourcollectible.deployed();

    expect(await yourcollectible.mintItem()).to.equal("Hello, world!");

    const setGreetingTx = await YourCollectible.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await YourCollectible.greet()).to.equal("Hola, mundo!");
  });
});

const { ethers, upgrades } = require("hardhat");

async function main() {
//   const gas = await ethers.provider.getGasPrice();
  const Acontract = await ethers.getContractFactory("A");
  console.log("Deploying contract A ...");
    const A = await upgrades.deployProxy(Acontract, [], {
    initializer: "initialize",
  });
    
  await A.waitForDeployment();
  console.log("Contract A deployed to:", A.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

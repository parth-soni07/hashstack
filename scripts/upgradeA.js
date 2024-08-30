const { ethers, upgrades } = require("hardhat");

const UPGRADEABLE_PROXY = "0x2F38EEdf95e1070Fb40D4c1E94bCa0902Cf41Aab";

async function main() {
//   const gas = await ethers.provider.getGasPrice();
  const AUpgraded = await ethers.getContractFactory("B");
  console.log("Upgrading Contract...");
  let a_upgraded = await upgrades.deployProxy(AUpgraded, [], {
    initializer: "initialize",
  });
    await a_upgraded.waitForDeployment();
  console.log("Upgraded Contract Deployed To:", a_upgraded.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

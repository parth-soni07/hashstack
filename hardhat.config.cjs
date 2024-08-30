require("@nomicfoundation/hardhat-toolbox");
require("@openzeppelin/hardhat-upgrades");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    bscTestnet: {
      url: process.env.RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
      chainId: 97,
    },
  },
  etherscan: {
    apiKey: {
      bscTestnet: "5AAU3VJVY9NR3AWHH518M462THRCRBFAPJ",
    },
  },
};

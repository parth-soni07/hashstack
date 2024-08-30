import React, { useState } from "react";
import { ethers } from "ethers";
import AAbi from "./abis/A.json";
import BAbi from "./abis/B.json";
import WalletConnectProvider from "@walletconnect/web3-provider";

const contractAAddress = "0x2F38EEdf95e1070Fb40D4c1E94bCa0902Cf41Aab";
const contractBAddress = "0xC10313193842B79C3528916183773F4678078A0e";

const ContractInteraction = () => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contractA, setContractA] = useState(null);
  const [contractB, setContractB] = useState(null);
  const [value, setValue] = useState("");
  const [newAdminAddress, setNewAdminAddress] = useState("");
  const [currentValue, setCurrentValue] = useState("");

  const connectWallet = async () => {
  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        infuraId: "b09256dcda4e414d8dc706f34d79372e" // Get an Infura ID from https://infura.io/dashboard
      }
    }
  };

  const web3Modal = new window.Web3Modal({
    cacheProvider: true, // optional
    providerOptions, // required
  });

  const instance = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(instance);
  const signer = provider.getSigner();
  
  setProvider(provider);
  setSigner(signer);

  const contractA = new ethers.Contract(contractAAddress, AAbi, signer);
  const contractB = new ethers.Contract(contractBAddress, BAbi, signer);
  setContractA(contractA);
  setContractB(contractB);
};

  const handleGetValue = async () => {
    if (contractA) {
      const result = await contractA.getValue();
      setCurrentValue(result.toString());
    }
  };

  const handleSetValue = async () => {
    if (contractA) {
      const tx = await contractA.setValue(value);
      await tx.wait();
      alert("Value has been set successfully.");
    }
  };

  const handleUpgradeContract = async () => {
    if (contractB) {
      const tx = await contractB.addAdmin(newAdminAddress);
      await tx.wait();
      alert("Contract upgraded successfully with new admin.");
    }
  };

  return (
    <div>
    <button onClick={connectWallet}>Connect with WalletConnect</button>

      <div>
        <h3>Getter Function</h3>
        <button onClick={handleGetValue}>Get Value</button>
        {currentValue && <p>Current Value: {currentValue}</p>}
      </div>

      <div>
        <h3>Setter Function</h3>
        <input
          type="number"
          placeholder="Enter value to increase"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button onClick={handleSetValue}>Set Value</button>
      </div>

      <div>
        <h3>Contract Upgradeability</h3>
        <input
          type="text"
          placeholder="Enter new admin address"
          value={newAdminAddress}
          onChange={(e) => setNewAdminAddress(e.target.value)}
        />
        <button onClick={handleUpgradeContract}>Upgrade Contract</button>
      </div>
    </div>
  );
};

export default ContractInteraction;

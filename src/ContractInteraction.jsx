import React, { useState, useEffect } from "react";
import { ethers, BrowserProvider } from "ethers";
// const [connected, setConnected] = useState(false);
import AAbi from "./abis/A.json";
import BAbi from "./abis/B.json";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider, useAccount } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, base } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

// const ethers = require("ethers");

const contractAAddress = "0x2F38EEdf95e1070Fb40D4c1E94bCa0902Cf41Aab";
const contractBAddress = "0xC10313193842B79C3528916183773F4678078A0e";
const provider = new BrowserProvider(window.ethereum);
const signer = await provider.getSigner();
const contractAabi = AAbi;
const contractA = new ethers.Contract(contractAAddress, contractAabi, signer);
const contractBabi = BAbi;
const contractB = new ethers.Contract(contractBAddress, contractBabi, signer);

const config = getDefaultConfig({
  appName: "Hashstack",
  projectId: "d0e48db228d8cafa34b154c24a407421",
  chains: [mainnet, polygon, optimism, arbitrum, base],
  ssr: true, // If your dApp uses server side rendering (SSR)
});
const queryClient = new QueryClient();
// ---------------------------------------------------------------------
const ContractInteraction = () => {

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <ConnectButton />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default ContractInteraction;

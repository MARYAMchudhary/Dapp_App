
import "./App.css";

import {
  WagmiConfig,
  createClient,
  configureChains,
  mainnet,
  goerli,
} from "wagmi";

import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { publicProvider } from "wagmi/providers/public";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";


import ConnectingWallet from "./Wagmi/ConnectingWallet";
import { Route, Routes } from "react-router-dom";
import { bscTestnet } from "@wagmi/core/chains";

function App() {
  const { provider, chains } = configureChains(
    [mainnet, goerli, bscTestnet],
    [
      jsonRpcProvider({
        rpc: (chain) => ({
          http:
            chain.id === 97
              ? `https://data-seed-prebsc-1-s1.binance.org:8545`
              :  `https://goerli.infura.io/v3/a50debb14c734109b08e35c65f591353`,
        }),
      }),

      publicProvider(),
    ]

  );
  const wagmiClient = createClient({
    provider, 
    connectors: [  
      new MetaMaskConnector({
        chains,
        options: {
          shimChainChangedDisconnect: true,
          shimDisconnect: false,
          UNSTABLE_shimOnConnectSelectAccount: false,
        },
      }),
    ],
  });

  return (
    <div>
      <WagmiConfig client={wagmiClient}>
        <ConnectingWallet />
    
      </WagmiConfig>
    </div>
  );
}

export default App;

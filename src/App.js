import logo from "./logo.svg";
import "./App.css";

import {
  WagmiConfig,
  createClient,
  useContractRead,
  configureChains,
  mainnet,
  goerli,
} from "wagmi";
import { InjectedConnector } from "@wagmi/core";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import Profile from "./Profile";
import { publicProvider } from "wagmi/providers/public";
import { jsonRpcProvider } from "@wagmi/core/providers/jsonRpc";

import ConnectingWallet from "./Wagmi/ConnectingWallet";
import { Route, Routes } from "react-router-dom";
import WriteContractWagmi from "./WriteContract/WriteContractWagmi";
// import { bscTestnet, optimism } from "wagmi/chains";
import { bscTestnet } from "@wagmi/core/chains";

function App() {
  const { provider, chains, webSocketProvider } = configureChains(
    [mainnet, goerli, bscTestnet],
    [
      jsonRpcProvider({
        rpc: (chain) => ({
          // http: `https://goerli.infura.io/v3/a50debb14c734109b08e35c65f591353`,
          http:
            chain.id === 97
              ? `https://data-seed-prebsc-1-s1.binance.org:8545`
              : `https:rpc.ankr.com/eth_goerli`,
        }),
      }),

      publicProvider(),
    ]
    //  network block skew detected; skipping block events (emitted=8523143 blockNumber27396043)
  );
  const wagmiClient = createClient({
    provider,
    webSocketProvider,
    connectors: [
      // new InjectedConnector({
      //   chains,
      // }),
      // new CoinbaseWalletConnector({ chains }),
      new MetaMaskConnector({
        chains,
        options: {
          shimChainChangedDisconnect: false,
          shimDisconnect: false,
          UNSTABLE_shimOnConnectSelectAccount: true,
        },
      }),
    ],
  });

  return (
    <div>
      <WagmiConfig client={wagmiClient}>
        {/* <ReadSmartWagmiContract /> */}
        <Routes>
          <Route path="/" element={<ConnectingWallet />} />
          {/* <Route path="/" element={<WriteContractWagmi />} /> */}
        </Routes>
      </WagmiConfig>
      {/* <ConnectingMetamask/> */}
      {/* <ReadsmartContract/> */}
    </div>
    // // <WagmiConfig client={client}>
    //   {/* <Profile /> */}
    //   <ReadSmartContract />
    // </WagmiConfig>
  );
}

export default App;

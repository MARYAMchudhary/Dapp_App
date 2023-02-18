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

function App() {
  const { provider, chains, webSocketProvider } = configureChains(
    [mainnet, goerli],
    [
      jsonRpcProvider({
        rpc: () => ({
          http: `https://goerli.infura.io/v3/a50debb14c734109b08e35c65f591353`,
        }),
      }),

      publicProvider(),
    ]
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
          shimDisconnect: true,
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
          {/* <Route path="/transationHistory" element={<TransactionHistory />} /> */}
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

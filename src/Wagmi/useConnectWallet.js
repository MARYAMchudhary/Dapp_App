import React from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";

function useConnectWallet() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { connect, connectors, isLoading, pendingConnector } = useConnect();
  return {
    address,
    isConnected,
    connect,
    connectors,
    isLoading,
    pendingConnector,
    disconnect,
  };
}

export default useConnectWallet;

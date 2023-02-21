import { useAccount, useConnect, useDisconnect } from "wagmi";

function useConnectWallet() {
  const { address, isConnected } = useAccount();
  const {
    disconnect,
    isSuccess: dissconnected,
    status,
  } = useDisconnect({
    onSettled(data, error) {
      // console.log("Settled", { data, error });
    },
  });
  const { connect, connectors, isLoading, pendingConnector } = useConnect();

  return {
    address,
    isConnected,
    connect,
    connectors,
    isLoading,
    pendingConnector,
    disconnect,
    dissconnected,
    status,
  
  };
}

export default useConnectWallet;

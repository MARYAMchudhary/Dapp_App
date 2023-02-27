import { useAccount, useBalance, useConnect, useDisconnect } from "wagmi";

function useConnectWallet() {
  const { address, connector,isConnected } = useAccount();
    const { data, isError } = useBalance({
      address: address,
    });
    console.log(data, "its wallet Balnace........");

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

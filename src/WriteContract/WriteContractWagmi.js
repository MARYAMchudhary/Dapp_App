import React from "react";
import { useBalance, useContractWrite, usePrepareContractWrite } from "wagmi";
import WRITEABI from "./writeAbi.json";
import useConnectWallet from "../Wagmi/useConnectWallet";
import { Button } from "@mui/material";
import { ethers } from "ethers";
function WriteContractWagmi() {
  const {
    address,
    isConnected,
    connect,
    connectors,
    pendingConnector,
    disconnect,
  } = useConnectWallet();
  const { data: balance } = useBalance({
    address: address,
  });
  const { config } = usePrepareContractWrite({
    address: "0xecb504d39723b0be0e3a9aa33d646642d1051ee1",
    abi: WRITEABI,
    functionName: "claim",
  });
  console.log(config, "its contractWriteConfig");
  const { data, isLoading, isSuccess, write } = useContractWrite(config);
  console.log(JSON.stringify(data));
  return (
    <div>
      {" "}
      {connectors.map((connector) => (
        <Button
          variant="contained"
          color="secondary"
          key={connector.id}
          onClick={() => connect({ connector })}
        >
          {connector.name}
          {isLoading &&
            pendingConnector?.id === connector.id &&
            " (connecting)"}
        </Button>
      ))}
      <div>
        Your Account address : <h4>{address}</h4>
        Your Account Balance:
        <h4>{parseFloat(balance?.formatted).toFixed(2)}ETH</h4>
      </div>
      <Button
        onClick={() => {
          disconnect();
        }}
      >
        Disconnect
      </Button>
      <div>
        <button
          disabled={!write}
          onClick={() => {
            write({
              recklesslySetUnpreparedArgs: 69,
              recklesslySetUnpreparedOverrides: {
                from: "0xA0Cf798816D4b9b9866b5330EEa46a18382f251e",
                value: ethers.utils.parseEther("0.01"),
              },
            });
          }}
        >
          Mint
        </button>
      </div>
    </div>
  );
}

export default WriteContractWagmi;

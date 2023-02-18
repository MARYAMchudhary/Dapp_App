import { InfuraProvider } from "@ethersproject/providers";
import ABIDATA from "../abi.json";

import React from "react";
import { useContract, useContractRead } from "wagmi";

function ReadSmartWagmiContract() {
  const contract= useContract({
//   const { data, isError, isLoading } = useContract({
    address: "0xAb1207074D6A81CAeDc95c257914Fde2564EFEF8",
    abi: ABIDATA,
    // functionName: "totalTicker",
  });
  console.log(contract, "data of smart contract");
  return <div>ReadSmartWagmiContract</div>;
}

export default ReadSmartWagmiContract;

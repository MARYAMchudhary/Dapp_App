import { useState } from "react";
import {
  useBalance,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";

import { useDebounce } from "use-debounce";
import ABIGOERLI from "./ABI/GoerliAbi.json";
import { ethers } from "ethers";
import useConnectWallet from "./useConnectWallet";
function useTransaction() {
  const [tokenAddress, settokenAddress] = useState("");
  const [to, setto] = useState("");
  const [valueToken, setValueToken] = useState("");
  const [debouncedAmount] = useDebounce(valueToken, 500);
  const { address } = useConnectWallet();
  const { data: balance } = useBalance({
    address: address,
    token: tokenAddress,
  });

  const {
    config,
    isError: isPrepareError,
    error: prepareError,
  } = usePrepareContractWrite({
    address: tokenAddress,
    abi: ABIGOERLI,
    functionName: "mint",
    args: [
      to,
      // debouncedAmount &&
      // ethers.utils.parseEther(debouncedAmount.toString()),
      ethers.utils.parseEther("0.1"),
    ],
  });

  //!USE CONTRACT READ
  const { data: contractReadBalance } = useContractRead({
    address: tokenAddress,
    abi: ABIGOERLI,
    functionName: "balanceOf",
    args: [tokenAddress],
  });

  const {
    data: datacontractWrite,
    write,
    error: contractwriteError,
    isError: contractwriteisError,
    reset,
  } = useContractWrite(config);

  //!USE WAIT FOR TRANSACTION
  const {
    data: waitTransaction,
    isLoading: contractWriteLoading,
    isSuccess: contractWriteSuccess,
  } = useWaitForTransaction({
    hash: datacontractWrite?.hash,
  });

  return {
    contractwriteError,
    contractwriteisError,
    isPrepareError,
    prepareError,
    write,
    setValueToken,
    setto,
    waitTransaction,
    to,
    reset,
    debouncedAmount,
    // valueToken,
    balance,
    datacontractWrite,
    contractWriteLoading,
    config,
    contractReadBalance,
    settokenAddress,
    tokenAddress,
    contractWriteSuccess,
  };
}

export default useTransaction;

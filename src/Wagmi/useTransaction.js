import { useState } from "react";
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";

import { useDebounce } from "use-debounce";
import ABIGOERLI from "./ABI/GoerliAbi.json";
import { ethers } from "ethers";
function useTransaction() {
  const [tokenAddress, settokenAddress] = useState("");
  const [to, setto] = useState("");
  const [valueToken, setValueToken] = useState("");
  const [debouncedAmount] = useDebounce(valueToken, 500);

  const {
    config,
    data: datausePrepareContractWrite,
    isError: isPrepareError,
    error: prepareError,
  } = usePrepareContractWrite({
    address: tokenAddress,
    abi: ABIGOERLI,
    functionName: "mint",

    args: [
      to,
      valueToken
      // debouncedAmount && ethers.utils.formatEther(debouncedAmount.toString()),
    ],
  });
  console.log(datausePrepareContractWrite, "hello");
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
  } = useContractWrite({ ...config });
  console.log(datacontractWrite, "its write method of contractWrite");
  //!USE WAIT FOR TRANSACTION
  const {
    data: waitTransaction,
    isLoading: contractWriteLoading,
    isSuccess: contractWriteSuccess,
  } = useWaitForTransaction({
    hash: datacontractWrite?.hash,
  });
  console.log(waitTransaction);

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
    // debouncedAmount,
    valueToken,
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

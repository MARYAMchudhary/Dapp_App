import { ethers } from "ethers";
import React, { useState } from "react";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { useDebounce } from "use-debounce";

import ABIGOERLI from "./ABI/GoerliAbi.json";
function useTransaction() {
  const [to, setto] = useState("");
  const [value, setValue] = useState("");
  const [debouncedAmount] = useDebounce(value, 500);
  console.log(debouncedAmount, "its debounceAmount");
  const {
    config,
    isError: isPrepareError,
    error: prepareError,
  } = usePrepareContractWrite({
    address: "0xBA62BCfcAaFc6622853cca2BE6Ac7d845BC0f2Dc",
    abi: ABIGOERLI,
    functionName: "transfer",
    args: [to, debouncedAmount && ethers.utils.parseEther(debouncedAmount)],
  });
  // console.log(ABIGOERLI);

  const {
    data: datacontractWrite,
    write,
    error: contractwriteError,
    isError: contractwriteisError,
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
    setValue,
    setto,
    waitTransaction,
    to,
    value,
    datacontractWrite,
    contractWriteLoading,
    config,

    contractWriteSuccess,
  };
}

export default useTransaction;

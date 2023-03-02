import { useState } from "react";
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  usePrepareSendTransaction,
  useSendTransaction,
  useWaitForTransaction,
} from "wagmi";

import { useDebounce } from "use-debounce";
import ABIGOERLI from "./ABI/GoerliAbi.json";
import { ethers } from "ethers";
function useTransaction() {
  const [tokenAddress, settokenAddress] = useState("");
  const [to, setto] = useState("");
  const [valueToken, setValueToken] = useState("");
  const [valueNativeCurrency, setValueNativeCurrency] = useState("");
  const [showNativeCurrency, setshowNativeCurrency] = useState(0);
  const [debouncedAmount] = useDebounce(valueNativeCurrency, 500);

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
      valueToken,
      // debouncedAmount && ethers.utils.formatEther(debouncedAmount.toString()),
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
  } = useContractWrite({ ...config });
  //*SEND TRANSACTION FOR NATIVE CURRENCY
  const { config: sendnative } = usePrepareSendTransaction({
    request: {
      to,
      value: debouncedAmount ? ethers.utils.parseEther(debouncedAmount) : "",
    },
  });
  const { data, sendTransaction,reset:resetNative } = useSendTransaction(sendnative);

  //!USE WAIT FOR TRANSACTION
  const {
    data: waitTransaction,
    isLoading: contractWriteLoading,
    isSuccess: contractWriteSuccess,
  } = useWaitForTransaction({
    hash: showNativeCurrency === 1 ? data?.hash : datacontractWrite?.hash,
  });

  return {
  data,
    write,
    setValueToken,
    setto,
    waitTransaction,
    to,
    reset,
    resetNative,
    sendTransaction,
    debouncedAmount,
    setValueNativeCurrency,
    showNativeCurrency,
    setshowNativeCurrency,
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

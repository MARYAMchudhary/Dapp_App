import { BigNumber, ethers } from "ethers";
import { useState } from "react";
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { useDebounce } from "use-debounce";
import ABIGOERLI from "./ABI/GoerliAbi.json";
function useTransaction() {
  const [to, setto] = useState("");
  const [value, setValue] = useState("");
  const [tokenAddress, settokenAddress] = useState("");
  const [debouncedAmount] = useDebounce(value, 500);

  const {
    config,
    data: datausePrepareContractWrite,
    isError: isPrepareError,
    error: prepareError,
  } = usePrepareContractWrite({
    address: tokenAddress,
    abi: ABIGOERLI,
    functionName: "mint",
    // args: [to],
    args: [to, debouncedAmount && ethers.utils.parseEther(debouncedAmount)],
    // overrides: {
    //   value:
    //     debouncedAmount &&
    //     ethers.utils.parseEther(debouncedAmount),
    // },
  });

  //!USE CONTRACT READ
  const {
    data: contractReadBalance,
    isError,
    isLoading,
  } = useContractRead({
    address: tokenAddress,
    abi: ABIGOERLI,
    functionName: "balanceOf",
    args: [tokenAddress],
  });

  console.log(
    contractReadBalance,
    // BigNumber.toString(data),
    // ethers.utils.formatUnits(data?.toString(), "ether"),
    "its contract read function"
  );
  console.log(datausePrepareContractWrite, "datausePrepareContractWrite");
  console.log(config, "configusePrepareContractWrite");

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
  console.log(datacontractWrite);
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
    reset,
    value,
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

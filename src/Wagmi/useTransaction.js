import { ethers } from "ethers";
import React, { useState } from "react";
import {
  usePrepareSendTransaction,
  useSendTransaction,
  useWaitForTransaction,
} from "wagmi";
import { useDebounce } from "use-debounce";
function useTransaction() {
  const [to, setto] = useState("");
  const [value, setValue] = useState("");
  const [debouncedAmount] = useDebounce(value, 500);
  const { config } = usePrepareSendTransaction({
    request: {
      to,
      value: debouncedAmount
        ? ethers.utils.parseEther(debouncedAmount)
        : undefined,
      // value: (value * 1e18).toString(),
    },
  });
  console.log(config, "here is the config");
  const { data, isSuccess, sendTransaction } = useSendTransaction(config);

  //!USE WAIT FOR TRANSACTION
  const { data: waitTransaction } = useWaitForTransaction({
    hash: data?.hash,
  });
  console.log("use wait for transaction", waitTransaction);
  return {
    sendTransaction,
    setValue,
    setto,
    waitTransaction,
    to,
    value,
    isSuccess,
    data,
  };
}

export default useTransaction;
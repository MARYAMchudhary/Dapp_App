import React from "react";
import { useContractRead, useEnsName, useSignMessage } from "wagmi";
import ABIDATA from "../abi.json";

function ReadSmartContract() {

//   const {data} = useEnsName({
//     address: "0xA0Cf798816D4b9b9866b5330EEa46a18382f251e",
//   });
  

    const {
      data: tokenURI,
      isError,
      isLoading,
    } = useContractRead({
      address: "0xA0Cf798816D4b9b9866b5330EEa46a18382f251e",
      abi: ABIDATA,
      functionName: ["owner"],
    });
  console.log(tokenURI, "smart contract data");

  return (
    <div>
      hello this is Read smart contract
    
      {/* <button onClick={onClick}>Sign Message</button> */}
    </div>
  );
}

export default ReadSmartContract;

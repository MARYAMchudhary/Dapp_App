import { ethers } from "ethers";
import React from "react";

function ConnectingMetamask() {
  const connectting = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    await provider.send("eth_requestAccounts", []);
      let signer = provider.getSigner();
      let getWalletBalance = await signer.getBalance();
    console.log(signer);
    console.log(await signer.getAddress());
    console.log(ethers.utils.formatEther(getWalletBalance));
  };
  return (
    <div>
      ConnectingMetamask
      <br />
      <button onClick={connectting}>connect wallet</button>
    </div>
  );
}

export default ConnectingMetamask;

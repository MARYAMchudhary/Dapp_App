import { ethers } from 'ethers';
import React from 'react'
import ABIDATA from "../abi.json"
function ReadsmartContract() {
  
const provider = new ethers.providers.JsonRpcProvider(
  "https://goerli.infura.io/v3/a50debb14c734109b08e35c65f591353"
);

const address = "0xAb1207074D6A81CAeDc95c257914Fde2564EFEF8";

const contract = new ethers.Contract(address, ABIDATA, provider);

const fetchData = async () => {
  const getName = await contract.getVote("BTC");
  const getTotalTracker = await contract.totalTicker();
  const gettickersArray = await contract.tickersArray(3);
 
  console.log(getName,"getName");
  console.log(getTotalTracker,"getTotalTracker");
  console.log(gettickersArray, "gettickersArray");
};
fetchData();

  return (
    <div>readsmartContract</div>
  )
}

export default ReadsmartContract
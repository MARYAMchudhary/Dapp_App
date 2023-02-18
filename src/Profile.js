import { Contract, ethers, Signer } from "ethers";
import { useEffect } from "react";
import {
  goerli,
  mainnet,
  useAccount,
  useConnect,
  useContractRead,
  useDisconnect,
} from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import ABIDATA from "./abi.json";
function Profile() {
  const { address, isConnected } = useAccount();
  console.log(ABIDATA, "abi");
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  useEffect(() => {
    (async () => {
      const provider = new ethers.providers.getDefaultProvider("goerli");
      // const signer = provider.getSigner();
      const contract = new Contract(
        "0xDAFEA492D9c6733ae3d56b7Ed1ADB60692c98Bc5",
        ABIDATA,
        provider
      );
      console.log(contract, "contract logged");
      const owner = await contract.owner();
      console.log(owner, "owner logged");
    })();
  }, []);

  const { disconnect } = useDisconnect();
  const { data, isError, isLoading } = useContractRead({
    address: "0xDAFEA492D9c6733ae3d56b7Ed1ADB60692c98Bc5",
    abi: ABIDATA,
    functionName: "owner",
    // args: ["ETH"],
  });
  console.log(data, "data");
  if (address)
    return (
      <div>
        Connected to {address}
        <button onClick={() => disconnect()}>Disconnect</button>
      </div>
    );
  return <button onClick={() => connect()}>Connect Wallet</button>;
}
export default Profile;

import React, { useEffect, useState } from "react";

import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { ethers } from "ethers";
import { useBalance } from "wagmi";
import useConnectWallet from "./useConnectWallet";
import useTransaction from "./useTransaction";

function ConnectingWallet() {
  const [toggle, settoggle] = useState(0);

  const [storeData, setstoreData] = useState([]);

  const {
    connect,
    connectors,
    isLoading,
    pendingConnector,
    address,
    isConnected,
    disconnect,
  } = useConnectWallet();

  const {
    setValue,
    setto,
    waitTransaction,
    contractWriteLoading,
    to,
    value,
    isSuccess,
    data, //!its native transaction hash
    reset,
    contractWriteSuccess,
    write,
    datacontractWrite,
  } = useTransaction();

  const { data: balance } = useBalance({
    address: address,
  });

  const handleDisconnect = () => {
    disconnect();
    setValue("");
    setto("");
  };

  useEffect(() => {
    let TransactionData = JSON.parse(localStorage.getItem("blockchain")) || [];
    console.log(TransactionData, "its data from localstorage");
    if (waitTransaction?.blockNumber) {
      TransactionData.push(waitTransaction);
      localStorage.setItem("blockchain", JSON.stringify(TransactionData));
      reset?.();
    }

    setstoreData(TransactionData);
  }, [waitTransaction]);
  return (
    <div>
      <Box mt={2}>
        <Container maxWidth="sm">
          <Paper elevation={6} sx={{ padding: "2rem" }}>
            {!isConnected ? (
              <div>
                <h4>connect your wallet</h4>
                {connectors.map((connector) => (
                  <Button
                    variant="contained"
                    color="secondary"
                    key={connector.id}
                    onClick={() => connect({ connector })}
                  >
                    {connector.name}
                    {isLoading &&
                      pendingConnector?.id === connector.id &&
                      " (connecting)"}
                  </Button>
                ))}
              </div>
            ) : (
              <>
                <div>
                  Your Account adddress : <h4>{address}</h4>
                  Your Account Balance:
                  <h4>{parseFloat(balance?.formatted).toFixed(2)}ETH</h4>
                </div>

                <div>
                  {" "}
                  <Button
                    onClick={handleDisconnect}
                    variant="outlined"
                    sx={{ marginLeft: "1rem" }}
                  >
                    Disconnect
                  </Button>
                </div>
              </>
            )}
            <Typography
              sx={{ display: "flex", justifyContent: "center" }}
              variant={"h4"}
              mt={2}
            >
              Send Transactions
            </Typography>

            {contractWriteSuccess && (
              <div>
                Successfully minted your NFT!
                <div>
                  <a
                    href={`https://goerli.etherscan.io/tx/${datacontractWrite?.hash}`}
                  >
                    GO TO Etherscan
                  </a>
                </div>
              </div>
            )}
            <TextField
              sx={{ marginY: "2rem" }}
              id="filled-basic"
              label="Reciever Address"
              variant="filled"
              value={to}
              onChange={(e) => setto(e.target.value)}
              fullWidth
            />
            <Box>
              {ethers.utils.isAddress(to) === true ? (
                <code
                  style={{ backgroundColor: "rgb(75, 199, 75)", color: "#000" }}
                >
                  your address is Valid
                </code>
              ) : (
                <code
                  style={{
                    backgroundColor: "rgb(255, 104, 104)",
                    color: "#000",
                  }}
                >
                  incorrect Reciever addresss
                </code>
              )}
            </Box>
            <br />
            <TextField
              sx={{ marginY: "1rem" }}
              id="filled-basic"
              label="Amount"
              type={"number"}
              variant="filled"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              fullWidth
            />

            <Box>
              <Button
                variant="contained"
                fullWidth
                onClick={() => write?.()}
                disabled={!write || contractWriteLoading}
                // onClick={() => {
                //   if (ethers.utils.isAddress(to) === true) {
                //     sendTransaction?.();
                //     setValue("");
                //     setto("");
                //   }
                // }}
                // disabled={!sendTransaction}
              >
                Send
              </Button>
            </Box>
            <Box mt={1}>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={() => settoggle(1)}
              >
                Go to Transaction History
              </Button>
            </Box>
            {isSuccess && (
              <div
                style={{
                  wordBreak: "break-all",
                  marginTop: "1rem",
                }}
              >
                Transaction: {JSON.stringify(data.hash)}
              </div>
            )}
          </Paper>
        </Container>
      </Box>
      {toggle == 1 ? (
        <>
          <Typography variant="h4" sx={{ marginTop: "2rem" }}>
            Transaction History
          </Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell> Transaction Hash</TableCell>
                  <TableCell>from</TableCell>
                  <TableCell>To</TableCell>
                  <TableCell align="right">Block No</TableCell>
                  <TableCell align="right">TXN Index</TableCell>
                  <TableCell>status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data ? (
                  <>
                    <TableRow>
                      <TableCell>{data?.hash}</TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell>Pending...</TableCell>
                    </TableRow>
                  </>
                ) : storeData.length + 1 ? (
                  <>
                    {storeData.map((row) => {
                      return (
                        <TableRow
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {row.transactionHash?.slice(0, 30) + "..."}
                          </TableCell>
                          <TableCell>{row.to?.slice(0, 20) + "..."}</TableCell>
                          <TableCell>
                            {row.from?.slice(0, 20) + "..."}
                          </TableCell>
                          <TableCell align="right">{row.blockNumber}</TableCell>
                          <TableCell align="right">
                            {row.transactionIndex}
                          </TableCell>
                          <TableCell>success</TableCell>
                        </TableRow>
                      );
                    })}
                  </>
                ) : (
                  ""
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default ConnectingWallet;

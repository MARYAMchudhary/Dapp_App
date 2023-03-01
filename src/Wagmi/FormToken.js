import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { ethers } from "ethers";
import useTransaction from "./useTransaction";
function FormToken() {
  const {
    setValueToken,
    setto,
    contractWriteLoading,
    to,
    debouncedAmount,

    contractWriteSuccess,
    write,
    datacontractWrite,
    tokenAddress,
    balance,
    settokenAddress,
  } = useTransaction();
  return (
    <div>
      {" "}
      <Typography
        sx={{ display: "flex", justifyContent: "center" }}
        variant={"h4"}
        mt={2}
      >
        Send ERC20 Token
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
      <form>
        <TextField
          sx={{ marginY: "2rem" }}
          id="filled-basic"
          label="token Address"
          variant="filled"
          value={tokenAddress}
          onChange={(e) => settokenAddress(e.target.value)}
          fullWidth
        />
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
          value={debouncedAmount}
          // onChange={handleChange}
          onChange={(e) => {
            setValueToken(e.target.value);
            console.log(debouncedAmount, "its value of token");
          }}
          fullWidth
        />
        {debouncedAmount > balance?.formatted && (
          <code
            style={{
              backgroundColor: "rgb(255, 104, 104)",
              color: "#fff",
              marginBottom: "2%",
            }}
          >
            your account have not enough tokens
          </code>
        )}
        <Box mt={2}>
          <Button
            variant="contained"
            fullWidth
            onClick={() => write?.()}
            disabled={
              !write ||
              contractWriteLoading ||
              debouncedAmount > balance?.formatted
            }
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
      </form>
    </div>
  );
}

export default FormToken;

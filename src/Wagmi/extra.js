const { data, isError, isLoading } = useContractRead({
  address: "0xBA62BCfcAaFc6622853cca2BE6Ac7d845BC0f2Dc",
  abi: ABIGOERLI,
  functionName: "balanceOf",
  args: ["0xBA62BCfcAaFc6622853cca2BE6Ac7d845BC0f2Dc"],
});

console.log(
  data,

  // ethers.utils.formatUnits(data?.toString(), "ether"),
  "its contract read function"
);

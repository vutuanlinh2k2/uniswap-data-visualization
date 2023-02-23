export const getEtherscanTransaction = (txAddr: string): string => {
  return `https://etherscan.io/tx/${txAddr}`
}

export const getEtherScanAccount = (accAddr: string): string => {
  return `https://etherscan.io/address/${accAddr}`
}

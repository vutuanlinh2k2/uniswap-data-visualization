import { WETH_ADDRESS } from "../constants/address"

export const formatTokenSymbol = (symbol: string, address: string) => {
  if (address === WETH_ADDRESS) {
    return "ETH"
  }
  return symbol
}

export const formatTokenName = (name: string, address: string) => {
  if (address === WETH_ADDRESS) {
    return "Ether"
  }
  return name
}

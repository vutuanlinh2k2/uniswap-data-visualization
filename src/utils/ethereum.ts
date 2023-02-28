import { getAddress } from "@ethersproject/address"

// a function that returns the checksummed version of an address
export const checksumAddress = (value: string): string => {
  return getAddress(value)
}

// a function that returns a shortened version of a hash
export const shortenHash = (hash: string): string => {
  if (hash.length < 10) {
    return ""
  }
  const firstSix = hash.substring(0, 6)
  const lastFour = hash.substring(hash.length - 4)
  return `${firstSix}...${lastFour}`
}

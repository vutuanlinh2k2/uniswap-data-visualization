import { getAddress } from "@ethersproject/address"

export const checksumAddress = (value: string): string => {
  return getAddress(value)
}

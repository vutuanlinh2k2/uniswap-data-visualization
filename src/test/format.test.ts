import { formatTokenSymbol, formatTokenName } from "../utils"
import { WETH_ADDRESS } from "../constants/address"

describe("formatTokenSymbol", () => {
  it("should return ETH when address is WETH_ADDRESS", () => {
    const symbol = "WETH"
    const address = WETH_ADDRESS
    const result = formatTokenSymbol(symbol, address)
    expect(result).toEqual("ETH")
  })

  it("should return symbol when address is not WETH_ADDRESS", () => {
    const symbol = "USDT"
    const address = "0xdac17f958d2ee523a2206206994597c13d831ec7"
    const result = formatTokenSymbol(symbol, address)
    expect(result).toEqual("USDT")
  })
})

describe("formatTokenName", () => {
  test("returns 'Ether' for WETH_ADDRESS", () => {
    const result = formatTokenName("Wrapped Ether", WETH_ADDRESS)
    expect(result).toEqual("Ether")
  })

  test("returns the same name for other tokens", () => {
    const result = formatTokenName("USDC", "0x6b175474e89094c44da98b954eedeac495271d0f")
    expect(result).toEqual("USDC")
  })
})

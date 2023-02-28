import { checksumAddress, shortenHash } from "../utils"

describe("checksumAddress", () => {
  it("returns the checksummed version of a lowercase address", () => {
    const input = "0x6b175474e89094c44da98b954eedeac495271d0f"
    const expectedOutput = "0x6B175474E89094C44Da98b954EedeAC495271d0F"
    expect(checksumAddress(input)).toEqual(expectedOutput)
  })

  it("returns the checksummed version of an uppercase address", () => {
    const input = "0x6B175474E89094C44DA98B954EEDEAC495271D0F"
    const expectedOutput = "0x6B175474E89094C44Da98b954EedeAC495271d0F"
    expect(checksumAddress(input)).toEqual(expectedOutput)
  })

  it("returns the same value for a checksummed address", () => {
    const input = "0x6B175474E89094C44Da98b954EedeAC495271d0F"
    expect(checksumAddress(input)).toEqual(input)
  })

  it("throws an error for an invalid address", () => {
    const input = "0xinvalidaddress"
    expect(() => checksumAddress(input)).toThrowError("invalid address")
  })
})

describe("shortenHash", () => {
  it("shortenHash returns empty string for hash less than 10 characters", () => {
    expect(shortenHash("")).toEqual("")
    expect(shortenHash("123456789")).toEqual("")
    expect(shortenHash("abcdef")).toEqual("")
  })

  it("shortenHash returns shortened hash for hash longer than 10 characters", () => {
    expect(shortenHash("0x4ee9ff2b173a86ea6d85bfd4c1a2e0b249901eaa")).toEqual("0x4ee9...1eaa")
  })
})

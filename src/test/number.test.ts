import { formatNumber, formatDollar, roundedSmallFloat } from "../utils"

describe("formatNumber", () => {
  it('should return "-" if the input is undefined', () => {
    expect(formatNumber(undefined)).toBe("-")
  })

  it('should return "0.00" if the input is 0', () => {
    expect(formatNumber(0)).toBe("0.00")
  })

  it('should return "<0.001" if the input is less than 0.001', () => {
    expect(formatNumber(0.0001)).toBe("<0.001")
  })

  it("should return the same number if input is greater than or equal to 0.001 and less than 1000", () => {
    expect(formatNumber(100)).toBe("100.00")
  })

  it('should format the number with the "k" suffix if the input is between 1000 and 1 million', () => {
    expect(formatNumber(3200)).toBe("3.20k")
  })

  it('should format the number with the "m" suffix if the input is between 1 million and 1 billion', () => {
    expect(formatNumber(5167000)).toBe("5.17m")
  })

  it('should format the number with the "b" suffix if the input is between 1 billion and 1 trillion', () => {
    expect(formatNumber(2749000000)).toBe("2.75b")
  })

  it('should format the number with the "t" suffix if the input is greater than or equal to 1 trillion', () => {
    expect(formatNumber(1511000000000)).toBe("1.51t")
  })

  it("should include the specified prefix in the formatted number", () => {
    expect(formatNumber(5167000, "$")).toBe("$5.17m")
  })
})

describe("formatDollar", () => {
  it('should return "-" if the input is undefined', () => {
    expect(formatDollar(undefined)).toBe("-")
  })

  it('should return "0.00" if the input is 0', () => {
    expect(formatDollar(0)).toBe("$0.00")
  })

  it('should return "<0.001" if the input is less than 0.001', () => {
    expect(formatDollar(0.0001)).toBe("<$0.001")
  })

  it("should return the same number if input is greater than or equal to 0.001 and less than 1000", () => {
    expect(formatDollar(100)).toBe("$100.00")
  })

  it('should format the number with the "k" suffix if the input is between 1000 and 1 million', () => {
    expect(formatDollar(3200)).toBe("$3.20k")
  })

  it('should format the number with the "m" suffix if the input is between 1 million and 1 billion', () => {
    expect(formatDollar(5167000)).toBe("$5.17m")
  })

  it('should format the number with the "b" suffix if the input is between 1 billion and 1 trillion', () => {
    expect(formatDollar(2749000000)).toBe("$2.75b")
  })

  it('should format the number with the "t" suffix if the input is greater than or equal to 1 trillion', () => {
    expect(formatDollar(1511000000000)).toBe("$1.51t")
  })
})

describe("roundedSmallFloat", () => {
  expect(roundedSmallFloat(0.123456789)).toBe(0.123456789)
  expect(roundedSmallFloat(1.23456789e-5)).toBe(0.0000123457)
})

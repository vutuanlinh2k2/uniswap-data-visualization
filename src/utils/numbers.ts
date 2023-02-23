import numbro from "numbro"

export const formatDollar = (num: number | undefined, digits = 2, round = true) => {
  if (!num) return "-"
  if (num === 0) return "$0.00"
  if (num < 0.001 && digits <= 3) {
    return "<$0.001"
  }

  return numbro(num).formatCurrency({
    average: round,
    mantissa: num > 1000 ? 2 : digits,
    abbreviations: {
      million: "m",
      billion: "b",
      trillion: "t",
    },
  })
}

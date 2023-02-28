import numbro from "numbro"

export const formatNumber = (num: number | undefined, prefix?: string): string => {
  if (num === undefined) return "-"
  if (num === 0) return `${prefix ?? ""}0.00`
  if (num < 0.001) {
    return `<${prefix ?? ""}0.001`
  }

  let suffix = ""
  if (num >= 1000000000000) {
    num = num / 1000000000000
    suffix = "t"
  } else if (num >= 1000000000) {
    num = num / 1000000000
    suffix = "b"
  } else if (num >= 1000000) {
    num = num / 1000000
    suffix = "m"
  } else if (num >= 1000) {
    num = num / 1000
    suffix = "k"
  }

  return `${prefix ?? ""}${numbro(num).format({
    mantissa: num > 1000 ? 2 : 2,
    abbreviations: {
      thousand: "k",
      million: "m",
      billion: "b",
      trillion: "t",
    },
  })}${suffix}`
}

export const formatDollar = (num: number | undefined) => {
  return formatNumber(num, "$")
}

export const roundedSmallFloat = (num: number): number => {
  return Math.round((num + Number.EPSILON) * 10000000000) / 10000000000
}

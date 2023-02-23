export const shortenHash = (hash: string): string => {
  const firstSix = hash.substr(0, 6)
  const lastFour = hash.substr(-4)
  return `${firstSix}...${lastFour}`
}

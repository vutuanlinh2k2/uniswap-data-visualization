export interface TokenData {
  id: string | number
  name: string
  symbol: string
  totalValueLockedUSD: number
  derivedETH: number
}

export interface AppContextType {
  tokensData: TokenData[]
  ethPriceUsd: number | null
}

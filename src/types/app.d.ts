export interface TokenData {
  id: string | number
  name: string
  symbol: string
  totalValueLockedUSD: number
}

export interface AppContextType {
  tokensData: TokenData[]
}

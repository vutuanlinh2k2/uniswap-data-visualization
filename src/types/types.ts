export interface TokenData {
  id: string | number
  name: string
  symbol: string
  totalValueLockedUSD: number
  derivedETH: number
}

export interface TransactionData {
  hash: string | undefined
  timestamp: number | undefined
  type: string
  token0: string | undefined
  token1: string | undefined
  totalValue: number | undefined
  token0Amount: number | undefined
  token1Amount: number | undefined
  account: string | undefined
}

export interface AppContextType {
  tokensData: TokenData[]
  transactionsData: TransactionData[]
  ethPriceUsd: number | null
}

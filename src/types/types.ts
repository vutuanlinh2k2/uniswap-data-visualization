export interface TokenData {
  address: string
  name: string
  symbol: string
  tvl: number
  price: number
  priceChange: number
  volume24h: number
}

export interface PoolData {
  id: string
  token0: string
  token1: string
  feeTier: number
  tvl: number
  volume24h: number
}

export interface TransactionData {
  hash: string | undefined
  timestamp: number | undefined
  type: string | undefined
  token0: string | undefined
  token1: string | undefined
  totalValue: number | undefined
  token0Amount: number | undefined
  token1Amount: number | undefined
  account: string | undefined
}

export interface AppContextType {
  tokensData: TokenData[]
  poolsData: PoolData[]
  transactionsData: TransactionData[]
  isLoadingTokens: boolean
  isErrorTokens: boolean
  isLoadingPools: boolean
  isErrorPools: boolean
  isTransactionsLoading: boolean
  isTransactionsError: boolean
  fetchAppData: Function | null
}

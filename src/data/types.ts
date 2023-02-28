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
  token0Symbol: string
  token1Symbol: string
  token0Address: string
  token1Address: string
  feeTier: number
  tvl: number
  volume24h: number
  volume7d: number
}

export interface TransactionData {
  hash: string
  timestamp: number | undefined
  type: string | undefined
  token0: string
  token1: string
  totalValue: number
  token0Amount: number
  token1Amount: number
  account: string
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
  fetchAppData: (() => Promise<void>) | null
}

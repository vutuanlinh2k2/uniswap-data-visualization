export interface TokenData {
  address: string | undefined
  name: string | undefined
  symbol: string | undefined
  tvl: number | undefined
  price: number | undefined
  priceChange: number | undefined
  volume24h: number | undefined
}

export interface PoolData {
  id: string | undefined
  token0Symbol: string | undefined
  token1Symbol: string | undefined
  token0Address: string | undefined
  token1Address: string | undefined
  feeTier: number | undefined
  tvl: number | undefined
  volume24h: number | undefined
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

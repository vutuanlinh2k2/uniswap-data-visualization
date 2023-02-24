import React, { useState, useEffect, createContext } from "react"
import { useLazyQuery } from "@apollo/client"

import { UniswapV3Client } from "./apollo"
import { AppContextType, TokenData } from "./types/types"
import {
  GetTokensDataDocument,
  GetCurrentEthPriceDocument,
  GetTransactionsDataDocument,
} from "./generate/uniswap-v3/graphql"

export const AppContext = createContext<AppContextType>({
  tokensData: [],
  transactionsData: [],
  ethPriceUsd: null,
})

interface AppContextProviderProps {
  children: React.ReactNode
}

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [ethPriceUsd, setEthPriceUsd] = useState<AppContextType["ethPriceUsd"]>(null)
  const [tokensData, setTokensData] = useState<AppContextType["tokensData"]>([])
  const [transactionsData, setTransactionsData] = useState<AppContextType["transactionsData"]>([])

  const [getCurrentEthPriceQuery] = useLazyQuery(GetCurrentEthPriceDocument, {
    client: UniswapV3Client,
    fetchPolicy: "network-only",
  })
  const [getTokensQuery] = useLazyQuery(GetTokensDataDocument, {
    client: UniswapV3Client,
    fetchPolicy: "network-only",
  })
  const [getTransactionsQuery] = useLazyQuery(GetTransactionsDataDocument, {
    client: UniswapV3Client,
    fetchPolicy: "network-only",
  })

  const fetchEthPrice = async () => {
    const { data: queryEthPriceData } = await getCurrentEthPriceQuery()
    if (!queryEthPriceData) return
    const ethPriceUSD = queryEthPriceData.bundles[0].ethPriceUSD
    setEthPriceUsd(ethPriceUSD)
  }

  const fetchTokenData = async () => {
    const { data: queryTokenData } = await getTokensQuery()
    if (!queryTokenData) return

    const formattedData = queryTokenData.tokens.map((token: TokenData) => {
      return {
        id: token.id,
        name: token.name,
        symbol: token.symbol,
        totalValueLockedUSD: token.totalValueLockedUSD,
        derivedETH: token.derivedETH,
      }
    })
    setTokensData(formattedData)
  }

  const fetchTransactionsData = async () => {
    const { data: queryTransactionData } = await getTransactionsQuery()
    if (!queryTransactionData) return
    const formattedData = queryTransactionData.transactions.map((transaction) => {
      const transactionType =
        transaction.mints.length > 0 ? "add" : transaction.burns.length > 0 ? "remove" : "swap"
      const transactionAdvancedData =
        transaction.mints.length > 0
          ? transaction.mints[0]
          : transaction.burns.length > 0
          ? transaction.burns[0]
          : transaction.swaps[0]
      return {
        hash: transaction.id,
        timestamp: transaction.timestamp,
        type: transactionType,
        token0: transactionAdvancedData?.pool.token0.symbol,
        token1: transactionAdvancedData?.pool.token1.symbol,
        token0Amount: parseFloat(transactionAdvancedData?.amount0),
        token1Amount: parseFloat(transactionAdvancedData?.amount1),
        account: transactionAdvancedData?.origin,
        totalValue: parseFloat(transactionAdvancedData?.amountUSD),
      }
    })
    setTransactionsData(formattedData)
  }

  const fetchData = () => {
    fetchEthPrice()
    fetchTokenData()
    fetchTransactionsData()
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <AppContext.Provider value={{ tokensData, transactionsData, ethPriceUsd }}>
      {children}
    </AppContext.Provider>
  )
}

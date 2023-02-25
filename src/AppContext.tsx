import React, { useEffect, useCallback, createContext } from "react"

import useTokensData from "./hooks/useTokensData"
import usePoolsData from "./hooks/usePoolsData"
import useTransactionsData from "./hooks/useTransactionsData"
import { AppContextType } from "./types/types"

export const AppContext = createContext<AppContextType>({
  tokensData: [],
  poolsData: [],
  transactionsData: [],
  isLoadingTokens: false,
  isErrorTokens: false,
  isLoadingPools: false,
  isErrorPools: false,
  isTransactionsLoading: false,
  isTransactionsError: false,
})

interface AppContextProviderProps {
  children: React.ReactNode
}

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const { tokensData, fetchTokensData, isLoadingTokens, isErrorTokens } = useTokensData()
  const { poolsData, fetchPoolsData, isLoadingPools, isErrorPools } = usePoolsData()
  const { transactionsData, fetchTransactionsData, isTransactionsLoading, isTransactionsError } =
    useTransactionsData()

  const fetchData = useCallback(async () => {
    await Promise.all([fetchTokensData(), fetchPoolsData(), fetchTransactionsData()])
  }, [fetchTokensData, fetchPoolsData, fetchTransactionsData])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <AppContext.Provider
      value={{
        tokensData,
        poolsData,
        transactionsData,
        isLoadingTokens,
        isErrorTokens,
        isLoadingPools,
        isErrorPools,
        isTransactionsLoading,
        isTransactionsError,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

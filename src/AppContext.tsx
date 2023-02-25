import React, { useState, useEffect, useCallback, createContext } from "react"

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
  fetchAppData: null,
})

interface AppContextProviderProps {
  children: React.ReactNode
}

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [tokensData, setTokensData] = useState<AppContextType["tokensData"]>([])
  const [isLoadingTokens, setIsLoadingTokens] = useState(false)
  const [isErrorTokens, setIsErrorTokens] = useState(false)

  const [poolsData, setPoolsData] = useState<AppContextType["poolsData"]>([])
  const [isLoadingPools, setIsLoadingPools] = useState(false)
  const [isErrorPools, setIsErrorPools] = useState(false)

  const [transactionsData, setTransactionsData] = useState<AppContextType["transactionsData"]>([])
  const [isTransactionsLoading, setIsTransactionsLoading] = useState(false)
  const [isTransactionsError, setIsTransactionsError] = useState(false)

  const { fetchTokensData } = useTokensData()
  const { fetchPoolsData } = usePoolsData()
  const { fetchTransactionsData } = useTransactionsData()

  const getTokens = useCallback(async () => {
    setIsLoadingTokens(true)
    const { data, isError } = await fetchTokensData()
    setTokensData(data)
    setIsErrorTokens(isError)
    setIsLoadingTokens(false)
  }, [fetchTokensData])

  const getPools = useCallback(async () => {
    setIsLoadingPools(true)
    const { data, isError } = await fetchPoolsData()
    setPoolsData(data)
    setIsErrorPools(isError)
    setIsLoadingPools(false)
  }, [fetchPoolsData])

  const getTransactions = useCallback(async () => {
    setIsTransactionsLoading(true)
    const { data, isError } = await fetchTransactionsData()
    setTransactionsData(data)
    setIsTransactionsError(isError)
    setIsTransactionsLoading(false)
  }, [fetchTransactionsData])

  const fetchAppData = useCallback(async () => {
    await Promise.all([getTokens(), getPools(), getTransactions()])
  }, [getTokens, getPools, getTransactions])

  useEffect(() => {
    fetchAppData()
  }, [fetchAppData])

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
        fetchAppData,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

import React, { useEffect, createContext } from "react"

import useEthPriceUsd from "./hooks/useEthPriceUsd"
import useTokensData from "./hooks/useTokensData"
import useTransactionsData from "./hooks/useTransactionsData"
import { AppContextType } from "./types/types"

export const AppContext = createContext<AppContextType>({
  tokensData: [],
  transactionsData: [],
  ethPriceUsd: null,
})

interface AppContextProviderProps {
  children: React.ReactNode
}

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const { ethPriceUsd, fetchEthPrice } = useEthPriceUsd()
  const { tokensData, fetchTokensData } = useTokensData()
  const { transactionsData, fetchTransactionsData } = useTransactionsData()

  const fetchData = () => {
    fetchEthPrice()
    fetchTokensData()
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

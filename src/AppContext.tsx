import React, { useState, useEffect, createContext } from "react"
import { useLazyQuery } from "@apollo/client"

import { AppContextType, TokenData } from "./types/app"
import { GetTokensDataDocument } from "./generate/graphql"

export const AppContext = createContext<AppContextType>({
  tokensData: [],
})

interface AppContextProviderProps {
  children: React.ReactNode
}

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [tokensData, setTokensData] = useState<AppContextType["tokensData"]>([])

  const [getTokensQuery] = useLazyQuery(GetTokensDataDocument, { fetchPolicy: "network-only" })

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getTokensQuery()
      if (!data) return
      console.log("data :", data)
      const formattedData = data.tokens.map((token: TokenData) => {
        return {
          id: token.id,
          name: token.name,
          symbol: token.symbol,
          totalValueLockedUSD: token.totalValueLockedUSD,
        }
      })
      setTokensData(formattedData)
    }
    fetchData()
  }, [])

  return <AppContext.Provider value={{ tokensData }}>{children}</AppContext.Provider>
}

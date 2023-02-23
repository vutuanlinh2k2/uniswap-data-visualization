import React, { useState, useEffect, createContext } from "react"
import { useLazyQuery } from "@apollo/client"

import { AppContextType, TokenData } from "./types/app"
import { GetTokensDataDocument, GetCurrentEthPriceDocument } from "./generate/graphql"

export const AppContext = createContext<AppContextType>({
  tokensData: [],
  ethPriceUsd: null,
})

interface AppContextProviderProps {
  children: React.ReactNode
}

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [tokensData, setTokensData] = useState<AppContextType["tokensData"]>([])
  const [ethPriceUsd, setEthPriceUsd] = useState<AppContextType["ethPriceUsd"]>(null)

  const [getCurrentEthPriceQuery] = useLazyQuery(GetCurrentEthPriceDocument, {
    fetchPolicy: "network-only",
  })
  const [getTokensQuery] = useLazyQuery(GetTokensDataDocument, { fetchPolicy: "network-only" })

  useEffect(() => {
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
    fetchTokenData()
  }, [])

  useEffect(() => {
    const fetchEthPrice = async () => {
      const { data: queryEthPriceData } = await getCurrentEthPriceQuery()
      if (!queryEthPriceData) return
      const ethPriceUSD = queryEthPriceData.bundles[0].ethPriceUSD

      setEthPriceUsd(ethPriceUSD)
    }
    fetchEthPrice()
  }, [])

  return <AppContext.Provider value={{ tokensData, ethPriceUsd }}>{children}</AppContext.Provider>
}

import { useState } from "react"
import { useLazyQuery } from "@apollo/client"

import { AppContextType } from "../types/types"
import { UniswapV3Client } from "../apollo"
import { GetTokensDataDocument } from "../generate/uniswap-v3/graphql"

export default () => {
  const [tokensData, setTokensData] = useState<AppContextType["tokensData"]>([])
  const [getTokensQuery] = useLazyQuery(GetTokensDataDocument, {
    client: UniswapV3Client,
    fetchPolicy: "network-only",
  })
  const fetchTokensData = async () => {
    const { data: queryTokenData } = await getTokensQuery()
    if (!queryTokenData) return

    const formattedData = queryTokenData.tokens.map((token) => {
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
  return {
    tokensData,
    fetchTokensData,
  }
}

import { useState, useCallback } from "react"
import { useLazyQuery } from "@apollo/client"

import { AppContextType } from "../types/types"
import { EthereumBlocksClient } from "../apollo"
import {
  GetTopTokensDocument,
  GetTokensDataDocument,
  GetEthPriceDocument,
} from "../generate/uniswap-v3/graphql"
import { getUnix24h } from "../utils/time"
import { roundedSmallFloat } from "../utils/numbers"
import { getBlocksQueryDocument } from "../utils/ethereumBlocks"

export default () => {
  const [tokensData, setTokensData] = useState<AppContextType["tokensData"]>([])
  const [isLoadingTokens, setIsLoadingTokens] = useState(false)
  const [isErrorTokens, setIsErrorTokens] = useState(false)

  const unix24h = getUnix24h()
  const blocksQueryDocument = getBlocksQueryDocument(unix24h)

  const [getBlocksQuery] = useLazyQuery(blocksQueryDocument, {
    client: EthereumBlocksClient,
    // fetchPolicy: "network-only",
  })

  const [getTopTokensQuery] = useLazyQuery(GetTopTokensDocument)
  const [getTokensQuery] = useLazyQuery(GetTokensDataDocument)
  const [getEthPrice] = useLazyQuery(GetEthPriceDocument)

  const fetchTokensData = useCallback(async () => {
    setIsLoadingTokens(true)
    try {
      const { data: queryTopTokensData, error: queryTopTokenError } = await getTopTokensQuery()
      const ids = queryTopTokensData?.tokens.map((token) => {
        return token.id
      })
      const { data: queryBlocksData, error: queryBlocksError } = await getBlocksQuery()
      const blockNumber = parseInt(queryBlocksData[`t${unix24h}`][0].number)

      const { data: queryTokensData, error: queryTokensError } = await getTokensQuery({
        variables: {
          idIn: ids,
        },
      })

      const { data: queryTokensData24h, error: queryTokens24hError } = await getTokensQuery({
        variables: {
          idIn: ids,
          block: { number: blockNumber },
        },
      })

      const { data: queryEthPrice, error: queryEthPriceError } = await getEthPrice({
        variables: {
          block24: blockNumber,
        },
      })

      const isError =
        !!queryTopTokenError ||
        !!queryBlocksError ||
        !!queryTokensError ||
        !!queryTokens24hError ||
        !!queryEthPriceError
      setIsErrorTokens(isError)

      const formattedData =
        queryTokensData && queryTokensData24h && queryEthPrice
          ? queryTokensData?.tokens.map((token, i) => {
              const tokenPrice =
                parseFloat(token.derivedETH) * parseFloat(queryEthPrice?.current[0].ethPriceUSD)
              const tokenPrice24h =
                parseFloat(queryTokensData24h?.tokens[i].derivedETH) *
                parseFloat(queryEthPrice?.oneDay[0].ethPriceUSD)
              const priceChange = 100 * ((tokenPrice - tokenPrice24h) / tokenPrice24h)

              return {
                id: token.id,
                name: token.name,
                symbol: token.symbol,
                tvl: token.totalValueLockedUSD,
                price: roundedSmallFloat(tokenPrice),
                priceChange: roundedSmallFloat(priceChange),
                volume24h: Math.abs(
                  parseFloat(token.volumeUSD) - parseFloat(queryTokensData24h?.tokens[i].volumeUSD)
                ),
              }
            })
          : []
      setTokensData(formattedData)
    } catch (e) {
      console.warn(e)
    }
    setIsLoadingTokens(false)
  }, [getTopTokensQuery, getBlocksQuery, getTokensQuery, getEthPrice])
  // , [])

  return {
    tokensData,
    fetchTokensData,
    isLoadingTokens,
    isErrorTokens,
  }
}

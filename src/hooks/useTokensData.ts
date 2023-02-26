import { useCallback } from "react"
import { useLazyQuery } from "@apollo/client"

import { EthereumBlocksClient } from "../apollo"
import {
  GetTopTokensDocument,
  GetTokensDataDocument,
  GetEthPriceDocument,
} from "../generate/uniswap-v3/graphql"
import { GetBlocksDocument } from "../generate/ethereum-blocks/graphql"
import { getUnix24h } from "../utils/time"
import { roundedSmallFloat } from "../utils/number"

export default () => {
  const [getBlocksQuery] = useLazyQuery(GetBlocksDocument, {
    client: EthereumBlocksClient,
  })

  const [getTopTokensQuery] = useLazyQuery(GetTopTokensDocument)
  const [getTokensQuery] = useLazyQuery(GetTokensDataDocument)
  const [getEthPrice] = useLazyQuery(GetEthPriceDocument)

  const fetchTokensData = useCallback(async () => {
    const { data: queryTopTokensData, error: queryTopTokenError } = await getTopTokensQuery()
    const ids = queryTopTokensData?.tokens.map((token) => {
      return token.id
    })
    const unix24h = getUnix24h()
    const { data: queryBlocksData, error: queryBlocksError } = await getBlocksQuery({
      variables: {
        timestamp_gt: unix24h,
        timestamp_lt: unix24h + 600,
      },
    })
    const blockNumber = parseInt(queryBlocksData?.blocks[0].number)

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

    const data =
      queryTokensData && queryTokensData24h && queryEthPrice
        ? queryTokensData?.tokens.map((token, i) => {
            const tokenPrice =
              parseFloat(token.derivedETH) * parseFloat(queryEthPrice?.current[0].ethPriceUSD)
            const tokenPrice24h =
              parseFloat(queryTokensData24h?.tokens[i].derivedETH) *
              parseFloat(queryEthPrice?.oneDay[0].ethPriceUSD)
            const priceChange = 100 * ((tokenPrice - tokenPrice24h) / tokenPrice24h)

            return {
              address: token.id,
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

    return {
      data: isError ? [] : data,
      isError,
    }
  }, [getTopTokensQuery, getBlocksQuery, getTokensQuery, getEthPrice])

  return {
    fetchTokensData,
  }
}

import { useCallback } from "react"
import { useLazyQuery } from "@apollo/client"

import { EthereumBlocksClient } from "../apollo"
import {
  GetTopTokensDocument,
  GetTokensDataDocument,
  GetEthPriceDocument,
} from "../generate/uniswap-v3/graphql"
import { GetBlocksDocument } from "../generate/ethereum-blocks/graphql"
import { TokenData } from "../types/types"
import {
  getUnix24h,
  roundedSmallFloat,
  mappingData,
  formatTokenName,
  formatTokenSymbol,
} from "../utils"

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

    if (
      isError ||
      !queryTopTokensData ||
      !queryBlocksData ||
      !queryTokensData ||
      !queryTokensData24h ||
      !queryEthPrice
    ) {
      return {
        data: [],
        isError,
      }
    }

    const mappingTokensData = mappingData(queryTokensData.tokens, queryTokensData24h.tokens, [])

    const formattedData: TokenData[] = Object.values(mappingTokensData).map((token) => {
      const priceCurrent =
        parseFloat(token?.current?.derivedETH) * parseFloat(queryEthPrice?.current[0].ethPriceUSD)
      const price24h =
        parseFloat(token?.oneDay?.derivedETH) * parseFloat(queryEthPrice?.oneDay[0].ethPriceUSD)
      const priceChange = 100 * ((priceCurrent - price24h) / price24h)

      const formattedTokenName =
        token?.current?.id && token?.current?.name
          ? formatTokenName(token?.current?.name, token?.current?.id)
          : "-"

      const formattedTokenSymbol =
        token?.current?.id && token?.current?.symbol
          ? formatTokenSymbol(token?.current?.symbol, token?.current?.id)
          : "-"

      return {
        address: token?.current?.id ?? "",
        name: formattedTokenName,
        symbol: formattedTokenSymbol,
        tvl: token?.current?.totalValueLockedUSD ?? 0,
        price: roundedSmallFloat(priceCurrent) ?? 0,
        priceChange: priceChange ?? 0,
        volume24h:
          token?.current?.volumeUSD && token?.oneDay?.volumeUSD
            ? Math.abs(parseFloat(token?.current?.volumeUSD) - parseFloat(token?.oneDay?.volumeUSD))
            : 0,
      }
    })

    return {
      data: formattedData,
      isError,
    }
  }, [getTopTokensQuery, getBlocksQuery, getTokensQuery, getEthPrice])

  return {
    fetchTokensData,
  }
}

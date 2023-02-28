import { useCallback } from "react"
import { useLazyQuery } from "@apollo/client"

import { EthereumBlocksClient } from "../apollo/client"
import {
  GetTopTokensDocument,
  GetTokensDataDocument,
  GetEthPriceDocument,
} from "../generate/uniswap-v3/graphql"
import { GetBlocksDocument } from "../generate/ethereum-blocks/graphql"
import { formatTokensData } from "../data"
import { getTimestamp24h } from "../utils"

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

    const unix24h = getTimestamp24h()
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

    const formattedData = formatTokensData(queryTokensData, queryTokensData24h, queryEthPrice)

    return {
      data: formattedData,
      isError,
    }
  }, [getTopTokensQuery, getBlocksQuery, getTokensQuery, getEthPrice])

  return {
    fetchTokensData,
  }
}

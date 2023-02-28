import { useCallback } from "react"
import { useLazyQuery } from "@apollo/client"

import { EthereumBlocksClient } from "../apollo/client"
import { GetTopPoolsDocument, GetPoolsDataDocument } from "../generate/uniswap-v3/graphql"
import { GetBlocksDocument } from "../generate/ethereum-blocks/graphql"
import { formatPoolsData } from "../data"
import { getTimestamp24h, getTimestamp7d } from "../utils"

export default () => {
  const [getBlocksQuery] = useLazyQuery(GetBlocksDocument, {
    client: EthereumBlocksClient,
  })
  const [getTopPoolsQuery] = useLazyQuery(GetTopPoolsDocument)
  const [getPoolsQuery] = useLazyQuery(GetPoolsDataDocument)

  const fetchPoolsData = useCallback(async () => {
    const { data: queryTopPoolsData, error: queryTopPoolsError } = await getTopPoolsQuery()
    const ids = queryTopPoolsData?.pools.map((pool) => {
      return pool.id
    })

    const timestamp24h = getTimestamp24h()
    const { data: queryBlocksData24h, error: queryBlocks24hError } = await getBlocksQuery({
      variables: {
        timestamp_gt: timestamp24h,
        timestamp_lt: timestamp24h + 600,
      },
    })
    const blockNumber24h = parseInt(queryBlocksData24h?.blocks[0].number)

    const timestamp7d = getTimestamp7d()
    const { data: queryBlocksData7d, error: queryBlocks7dError } = await getBlocksQuery({
      variables: {
        timestamp_gt: timestamp7d,
        timestamp_lt: timestamp7d + 600,
      },
    })
    const blockNumber7d = parseInt(queryBlocksData7d?.blocks[0].number)

    const { data: queryPoolsData, error: queryPoolsError } = await getPoolsQuery({
      variables: {
        idIn: ids,
      },
    })

    const { data: queryPoolsData24h, error: queryPools24hError } = await getPoolsQuery({
      variables: {
        idIn: ids,
        block: { number: blockNumber24h },
      },
    })

    const { data: queryPoolsData7d, error: queryPools7dError } = await getPoolsQuery({
      variables: {
        idIn: ids,
        block: { number: blockNumber7d },
      },
    })

    const isError =
      !!queryTopPoolsError ||
      !!queryBlocks24hError ||
      !!queryBlocks7dError ||
      !!queryPoolsError ||
      !!queryPools24hError ||
      !!queryPools7dError

    if (
      isError ||
      !queryTopPoolsData ||
      !queryBlocksData24h ||
      !queryPoolsData ||
      !queryPoolsData24h ||
      !queryPoolsData7d
    ) {
      return {
        data: [],
        isError,
      }
    }

    const formattedData = formatPoolsData(queryPoolsData, queryPoolsData24h, queryPoolsData7d)

    return {
      data: formattedData,
      isError,
    }
  }, [getTopPoolsQuery, getPoolsQuery])

  return {
    fetchPoolsData,
  }
}

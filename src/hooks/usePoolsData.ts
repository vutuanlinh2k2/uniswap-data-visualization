import { useCallback } from "react"
import { useLazyQuery } from "@apollo/client"

import { EthereumBlocksClient } from "../apollo"
import { GetTopPoolsDocument, GetPoolsDataDocument } from "../generate/uniswap-v3/graphql"
import { GetBlocksDocument } from "../generate/ethereum-blocks/graphql"
import { getUnix24h } from "../utils/time"

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

    const unix24h = getUnix24h()
    const { data: queryBlocksData, error: queryBlocksError } = await getBlocksQuery({
      variables: {
        timestamp_gt: unix24h,
        timestamp_lt: unix24h + 600,
      },
    })
    const blockNumber = parseInt(queryBlocksData?.blocks[0].number)

    const { data: queryPoolsData24h, error: queryPools24hError } = await getPoolsQuery({
      variables: {
        idIn: ids,
        block: { number: blockNumber },
      },
    })

    const { data: queryPoolsData, error: queryPoolsError } = await getPoolsQuery({
      variables: {
        idIn: ids,
      },
    })

    const isError =
      !!queryTopPoolsError || !!queryBlocksError || !!queryPoolsError || !!queryPools24hError

    const data =
      queryPoolsData && queryPoolsData24h
        ? queryPoolsData?.pools.map((pool, i) => {
            return {
              id: pool.id,
              token0: pool.token0.symbol,
              token1: pool.token1.symbol,
              feeTier: parseInt(pool.feeTier),
              tvl: parseFloat(pool.totalValueLockedUSD),
              volume24h: Math.abs(
                parseFloat(pool.totalValueLockedUSD) -
                  parseFloat(queryPoolsData24h?.pools[i].totalValueLockedUSD)
              ),
            }
          })
        : []

    return {
      data: isError ? [] : data,
      isError,
    }
  }, [getTopPoolsQuery, getPoolsQuery])

  return {
    fetchPoolsData,
  }
}

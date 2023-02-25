import { useState, useCallback } from "react"
import { useLazyQuery } from "@apollo/client"

import { AppContextType } from "../types/types"
import { UniswapV3Client, EthereumBlocksClient } from "../apollo"
import { GetTopPoolsDocument, GetPoolsDataDocument } from "../generate/uniswap-v3/graphql"
import { getUnix24h } from "../utils/time"
import { getBlocksQueryDocument } from "../utils/ethereumBlocks"

export default () => {
  const [poolsData, setPoolsData] = useState<AppContextType["poolsData"]>([])
  const [isLoadingPools, setIsLoadingPools] = useState(false)
  const [isErrorPools, setIsErrorPools] = useState(false)

  const unix24h = getUnix24h()
  const blocksQueryDocument = getBlocksQueryDocument(unix24h)

  const [getBlocksQuery] = useLazyQuery(blocksQueryDocument, {
    client: EthereumBlocksClient,
    // fetchPolicy: "network-only",
  })

  const [getTopPoolsQuery] = useLazyQuery(GetTopPoolsDocument, {
    client: UniswapV3Client,
    // fetchPolicy: "network-only",
  })

  const [getPoolsQuery] = useLazyQuery(GetPoolsDataDocument, {
    client: UniswapV3Client,
    // fetchPolicy: "network-only",
  })

  const fetchPoolsData = useCallback(async () => {
    setIsLoadingPools(true)
    try {
      const { data: queryTopPoolsData, error: queryTopPoolsError } = await getTopPoolsQuery()
      const ids = queryTopPoolsData?.pools.map((pool) => {
        return pool.id
      })
      const { data: queryBlocksData, error: queryBlocksError } = await getBlocksQuery()
      const blockNumber = parseInt(queryBlocksData[`t${unix24h}`][0].number)

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
      setIsErrorPools(isError)

      const formattedData =
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
      setPoolsData(formattedData)
    } catch (e) {
      console.warn(e)
    }
    setIsLoadingPools(false)
  }, [getTopPoolsQuery, getBlocksQuery, getPoolsQuery])

  return {
    poolsData,
    fetchPoolsData,
    isLoadingPools,
    isErrorPools,
  }
}

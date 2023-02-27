import { useCallback } from "react"
import { useLazyQuery } from "@apollo/client"

import { EthereumBlocksClient } from "../apollo"
import { GetTopPoolsDocument, GetPoolsDataDocument } from "../generate/uniswap-v3/graphql"
import { GetBlocksDocument } from "../generate/ethereum-blocks/graphql"
import { getUnix24h, mappingData } from "../utils"

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

    const { data: queryPoolsData, error: queryPoolsError } = await getPoolsQuery({
      variables: {
        idIn: ids,
      },
    })

    const { data: queryPoolsData24h, error: queryPools24hError } = await getPoolsQuery({
      variables: {
        idIn: ids,
        block: { number: blockNumber },
      },
    })

    const isError =
      !!queryTopPoolsError || !!queryBlocksError || !!queryPoolsError || !!queryPools24hError

    if (
      isError ||
      !queryTopPoolsData ||
      !queryBlocksData ||
      !queryPoolsData ||
      !queryPoolsData24h
    ) {
      return {
        data: [],
        isError,
      }
    }

    const mappingPoolsData = mappingData(queryPoolsData.pools, queryPoolsData24h.pools)

    const formattedData = Object.values(mappingPoolsData).map((pool) => {
      const ethPrice = parseFloat(queryPoolsData.bundles[0].ethPriceUSD)
      const feePercent = parseFloat(pool?.current?.feeTier) / 10000 / 100
      const tvlAdjusted0 = (parseFloat(pool.current?.volumeToken0) * feePercent) / 2
      const tvlAdjusted1 = (parseFloat(pool.current?.volumeToken1) * feePercent) / 2
      const tvlToken0 = parseFloat(pool.current?.totalValueLockedToken0) - tvlAdjusted0
      const tvlToken1 = parseFloat(pool.current?.totalValueLockedToken1) - tvlAdjusted1
      const tvl =
        tvlToken0 * parseFloat(pool?.current?.token0?.derivedETH) * ethPrice +
        tvlToken1 * parseFloat(pool?.current?.token1?.derivedETH) * ethPrice

      return {
        id: pool?.current?.id,
        token0Symbol: pool?.current?.token0?.symbol,
        token1Symbol: pool?.current?.token1?.symbol,
        token0Address: pool?.current?.token0?.id,
        token1Address: pool?.current?.token1?.id,
        feeTier: parseInt(pool?.current?.feeTier),
        tvl: tvl,
        volume24h: Math.abs(
          parseFloat(pool?.current?.volumeUSD) - parseFloat(pool?.oneDay?.volumeUSD)
        ),
      }
    })

    return {
      data: formattedData,
      isError,
    }
  }, [getTopPoolsQuery, getPoolsQuery])

  return {
    fetchPoolsData,
  }
}

import { useCallback } from "react"
import { useLazyQuery } from "@apollo/client"

import { EthereumBlocksClient } from "../apollo"
import { GetTopPoolsDocument, GetPoolsDataDocument } from "../generate/uniswap-v3/graphql"
import { GetBlocksDocument } from "../generate/ethereum-blocks/graphql"
import { PoolData } from "../types/types"
import { getUnix24h, getUnix7d, mappingData, formatTokenSymbol } from "../utils"

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
    const unix7d = getUnix7d()

    const { data: queryBlocksData24h, error: queryBlocks24hError } = await getBlocksQuery({
      variables: {
        timestamp_gt: unix24h,
        timestamp_lt: unix24h + 600,
      },
    })
    const blockNumber24h = parseInt(queryBlocksData24h?.blocks[0].number)

    const { data: queryBlocksData7d, error: queryBlocks7dError } = await getBlocksQuery({
      variables: {
        timestamp_gt: unix7d,
        timestamp_lt: unix7d + 600,
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

    const mappingPoolsData = mappingData(
      queryPoolsData.pools,
      queryPoolsData24h.pools,
      queryPoolsData7d.pools
    )

    const formattedData: PoolData[] = Object.values(mappingPoolsData).map((pool) => {
      const ethPrice = queryPoolsData.bundles[0].ethPriceUSD
        ? parseFloat(queryPoolsData.bundles[0].ethPriceUSD)
        : 0
      const feePercent = pool?.current?.feeTier
        ? parseFloat(pool?.current?.feeTier) / 10000 / 100
        : 0
      const tvlAdjusted0 = pool.current?.volumeToken0
        ? (parseFloat(pool.current?.volumeToken0) * feePercent) / 2
        : 0
      const tvlAdjusted1 = pool.current?.volumeToken1
        ? (parseFloat(pool.current?.volumeToken1) * feePercent) / 2
        : 0
      const tvlToken0 = pool.current?.totalValueLockedToken0
        ? parseFloat(pool.current?.totalValueLockedToken0) - tvlAdjusted0
        : 0
      const tvlToken1 = pool.current?.totalValueLockedToken1
        ? parseFloat(pool.current?.totalValueLockedToken1) - tvlAdjusted1
        : 0
      const tvl =
        pool?.current?.token0?.derivedETH && pool?.current?.token1?.derivedETH
          ? tvlToken0 * parseFloat(pool?.current?.token0?.derivedETH) * ethPrice +
            tvlToken1 * parseFloat(pool?.current?.token1?.derivedETH) * ethPrice
          : 0

      const formattedToken0Symbol =
        pool?.current?.token0?.symbol && pool?.current?.token0?.id
          ? formatTokenSymbol(pool?.current?.token0?.symbol, pool?.current?.token0?.id)
          : "-"

      const formattedToken1Symbol =
        pool?.current?.token1?.symbol && pool?.current?.token1?.id
          ? formatTokenSymbol(pool?.current?.token1?.symbol, pool?.current?.token1?.id)
          : "-"

      return {
        id: pool?.current?.id ?? "",
        token0Symbol: formattedToken0Symbol,
        token1Symbol: formattedToken1Symbol,
        token0Address: pool?.current?.token0?.id ?? "",
        token1Address: pool?.current?.token1?.id ?? "",
        feeTier: pool?.current?.feeTier ? parseInt(pool?.current?.feeTier) : 0,
        tvl: tvl,
        volume24h:
          pool?.current?.volumeUSD && pool?.oneDay?.volumeUSD
            ? Math.abs(parseFloat(pool?.current?.volumeUSD) - parseFloat(pool?.oneDay?.volumeUSD))
            : 0,
        volume7d:
          pool?.current?.volumeUSD && pool?.oneWeek?.volumeUSD
            ? Math.abs(parseFloat(pool?.current?.volumeUSD) - parseFloat(pool?.oneWeek?.volumeUSD))
            : 0,
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

import mappingData from "./mappingData"
import { PoolData } from "./types"
import { GetPoolsDataQuery } from "../generate/uniswap-v3/graphql"
import { formatTokenSymbol } from "../utils"

export default (
  queryPoolsDataCurrent: GetPoolsDataQuery,
  queryPoolData24h: GetPoolsDataQuery,
  queryPoolData7d: GetPoolsDataQuery
): PoolData[] => {
  const mappingPoolsData = mappingData(
    queryPoolsDataCurrent.pools,
    queryPoolData24h.pools,
    queryPoolData7d.pools
  )

  return Object.values(mappingPoolsData).map((pool) => {
    const ethPrice = queryPoolsDataCurrent.bundles[0].ethPriceUSD
      ? parseFloat(queryPoolsDataCurrent.bundles[0].ethPriceUSD)
      : 0
    const feePercent = pool?.current?.feeTier ? parseFloat(pool?.current?.feeTier) / 10000 / 100 : 0
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
}

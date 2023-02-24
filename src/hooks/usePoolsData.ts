import { useState } from "react"
import { useLazyQuery } from "@apollo/client"

import { AppContextType } from "../types/types"
import { UniswapV3Client, EthereumBlocksClient } from "../apollo"
import { GetTopPoolsDocument, GetPoolsDataDocument } from "../generate/uniswap-v3/graphql"
import { getUnix24h } from "../utils/time"
import { getBlocksQueryDocument } from "../utils/ethereumBlocks"

export default () => {
  const [poolsData, setPoolsData] = useState<AppContextType["poolsData"]>([])

  const unix24h = getUnix24h()
  const blocksQueryDocument = getBlocksQueryDocument(unix24h)

  const [getBlocksQuery] = useLazyQuery(blocksQueryDocument, {
    client: EthereumBlocksClient,
    fetchPolicy: "network-only",
  })

  const [getTopPoolsQuery] = useLazyQuery(GetTopPoolsDocument, {
    client: UniswapV3Client,
    fetchPolicy: "no-cache",
  })

  const [getPoolsQuery] = useLazyQuery(GetPoolsDataDocument, {
    client: UniswapV3Client,
    fetchPolicy: "no-cache",
  })

  const fetchPoolsData = async () => {
    try {
      const { data: queryTopPoolsData } = await getTopPoolsQuery()
      const ids = queryTopPoolsData?.pools.map((pool) => {
        return pool.id
      })
      const { data: queryBlocksData } = await getBlocksQuery()
      const blockNumber = parseInt(queryBlocksData[`t${unix24h}`][0].number)

      const { data: queryPoolsData24h } = await getPoolsQuery({
        variables: {
          idIn: ids,
          block: { number: blockNumber },
        },
      })

      const { data: queryPoolsData } = await getPoolsQuery({
        variables: {
          idIn: ids,
        },
      })

      console.log("queryPoolsData :", queryPoolsData?.pools[4])
      console.log("queryPoolsData24h: ", queryPoolsData24h?.pools[4])

      const formattedData = queryPoolsData?.pools.map((pool, i) => {
        return {
          id: pool.id,
          token0: pool.token0.symbol,
          token1: pool.token1.symbol,
          tvl: pool.totalValueLockedUSD,
          volume24h: pool.volumeUSD - queryPoolsData24h?.pools[i].volumeUSD,
        }
      })
      setPoolsData(formattedData)
    } catch (e) {
      console.log(e)
    }
  }
  return {
    poolsData,
    fetchPoolsData,
  }
}

import { useState } from "react"
import { useLazyQuery } from "@apollo/client"

import { AppContextType } from "../types/types"
import { UniswapV3Client, EthereumBlocksClient } from "../apollo"
import {
  GetTopTokensDocument,
  GetTokensDataDocument,
  GetTokensDataBasedOnBlockDocument,
} from "../generate/uniswap-v3/graphql"
import { getUnix24h } from "../utils/time"
import { getBlocksQueryDocument } from "../utils/ethereumBlocks"

export default () => {
  const [tokensData, setTokensData] = useState<AppContextType["tokensData"]>([])

  const unix24h = getUnix24h()
  const blocksQueryDocument = getBlocksQueryDocument(unix24h)

  const [getBlocksQuery] = useLazyQuery(blocksQueryDocument, {
    client: EthereumBlocksClient,
    fetchPolicy: "network-only",
  })

  const [getTopTokensQuery] = useLazyQuery(GetTopTokensDocument, {
    client: UniswapV3Client,
    fetchPolicy: "network-only",
  })

  const [getTokensQuery] = useLazyQuery(GetTokensDataDocument, {
    client: UniswapV3Client,
    fetchPolicy: "network-only",
  })

  const [getTokensBasedOnBlockQuery] = useLazyQuery(GetTokensDataBasedOnBlockDocument, {
    client: UniswapV3Client,
    fetchPolicy: "network-only",
  })

  const fetchTokensData = async () => {
    try {
      const { data: queryTopTokenData } = await getTopTokensQuery()
      const ids = queryTopTokenData?.tokens.map((token) => {
        return token.id
      })
      const { data: queryBlocksData } = await getBlocksQuery()
      const blockNumber = parseInt(queryBlocksData[`t${unix24h}`][0].number)

      const { data: queryTokensData } = await getTokensQuery({
        variables: {
          idIn: ids,
        },
      })

      const { data: queryTokensData24h } = await getTokensBasedOnBlockQuery({
        variables: {
          idIn: ids,
          blockNumber: blockNumber,
        },
      })

      console.log("queryTokensData :", queryTokensData)
      console.log("queryTokensData24h: ", queryTokensData24h)
    } catch (e) {
      console.log(e)
    }
    // if (!queryTokensData24h) return

    // const formattedData = queryTokensData24h.tokens.map((token) => {
    //   return {
    //     id: token.id,
    //     name: token.name,
    //     symbol: token.symbol,
    //     totalValueLockedUSD: token.totalValueLockedUSD,
    //     derivedETH: token.derivedETH,
    //   }
    // })
    // setTokensData(formattedData)
  }
  return {
    tokensData,
    fetchTokensData,
  }
}

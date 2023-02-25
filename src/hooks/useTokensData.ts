import { useState } from "react"
import { useLazyQuery } from "@apollo/client"

import { AppContextType } from "../types/types"
import { UniswapV3Client, EthereumBlocksClient } from "../apollo"
import {
  GetTopTokensDocument,
  GetTokensDataDocument,
  GetEthPriceDocument,
} from "../generate/uniswap-v3/graphql"
import { getUnix24h } from "../utils/time"
import { roundedSmallFloat } from "../utils/numbers"
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

  const [getEthPrice] = useLazyQuery(GetEthPriceDocument, {
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

      const { data: queryTokensData24h } = await getTokensQuery({
        variables: {
          idIn: ids,
          block: { number: blockNumber },
        },
      })

      const { data: queryEthPrice } = await getEthPrice({
        variables: {
          block24: blockNumber,
        },
      })

      console.log("queryTokensData :", queryTokensData)
      console.log("queryTokensData24h: ", queryTokensData24h)
      console.log("queryEthPrice: ", queryEthPrice)

      const formattedData =
        queryTokensData && queryTokensData24h && queryEthPrice
          ? queryTokensData?.tokens.map((token, i) => {
              const tokenPrice =
                parseFloat(token.derivedETH) * parseFloat(queryEthPrice?.current[0].ethPriceUSD)
              const tokenPrice24h =
                parseFloat(queryTokensData24h?.tokens[i].derivedETH) *
                parseFloat(queryEthPrice?.oneDay[0].ethPriceUSD)
              const priceChange = 100 * ((tokenPrice - tokenPrice24h) / tokenPrice24h)

              return {
                id: token.id,
                name: token.name,
                symbol: token.symbol,
                tvl: token.totalValueLockedUSD,
                price: roundedSmallFloat(tokenPrice),
                priceChange: roundedSmallFloat(priceChange),
                volume24h: Math.abs(
                  parseFloat(token.volumeUSD) - parseFloat(queryTokensData24h?.tokens[i].volumeUSD)
                ),
              }
            })
          : []

      setTokensData(formattedData)
    } catch (e) {
      console.log(e)
    }
  }
  return {
    tokensData,
    fetchTokensData,
  }
}

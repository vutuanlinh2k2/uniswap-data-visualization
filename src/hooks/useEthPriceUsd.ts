import { useState } from "react"
import { useLazyQuery } from "@apollo/client"

import { AppContextType } from "../types/types"
import { UniswapV3Client } from "../apollo"
import { GetCurrentEthPriceDocument } from "../generate/uniswap-v3/graphql"

export default () => {
  const [ethPriceUsd, setEthPriceUsd] = useState<AppContextType["ethPriceUsd"]>(null)
  const [getCurrentEthPriceQuery] = useLazyQuery(GetCurrentEthPriceDocument, {
    client: UniswapV3Client,
    fetchPolicy: "network-only",
  })
  const fetchEthPrice = async () => {
    const { data: queryEthPriceData } = await getCurrentEthPriceQuery()
    if (!queryEthPriceData) return
    const ethPriceUSD = queryEthPriceData.bundles[0].ethPriceUSD
    setEthPriceUsd(ethPriceUSD)
  }
  return {
    ethPriceUsd,
    fetchEthPrice,
  }
}

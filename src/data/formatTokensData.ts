import mappingData from "./mappingData"
import { TokenData } from "./types"
import { GetTokensDataQuery, GetEthPriceQuery } from "../generate/uniswap-v3/graphql"
import { formatTokenName, formatTokenSymbol, roundedSmallFloat } from "../utils"

export default (
  queryTokensDataCurrent: GetTokensDataQuery,
  queryTokensData24h: GetTokensDataQuery,
  queryEthPrice: GetEthPriceQuery
): TokenData[] => {
  const mappingTokensData = mappingData(
    queryTokensDataCurrent.tokens,
    queryTokensData24h.tokens,
    []
  )

  return Object.values(mappingTokensData).map((token) => {
    const priceCurrent =
      parseFloat(token?.current?.derivedETH) * parseFloat(queryEthPrice?.current[0].ethPriceUSD)
    const price24h =
      parseFloat(token?.oneDay?.derivedETH) * parseFloat(queryEthPrice?.oneDay[0].ethPriceUSD)
    const priceChange = 100 * ((priceCurrent - price24h) / price24h)

    const formattedTokenName =
      token?.current?.id && token?.current?.name
        ? formatTokenName(token?.current?.name, token?.current?.id)
        : "-"

    const formattedTokenSymbol =
      token?.current?.id && token?.current?.symbol
        ? formatTokenSymbol(token?.current?.symbol, token?.current?.id)
        : "-"

    return {
      address: token?.current?.id ?? "",
      name: formattedTokenName,
      symbol: formattedTokenSymbol,
      tvl: token?.current?.totalValueLockedUSD ?? 0,
      price: roundedSmallFloat(priceCurrent) ?? 0,
      priceChange: priceChange ?? 0,
      volume24h:
        token?.current?.volumeUSD && token?.oneDay?.volumeUSD
          ? Math.abs(parseFloat(token?.current?.volumeUSD) - parseFloat(token?.oneDay?.volumeUSD))
          : 0,
    }
  })
}

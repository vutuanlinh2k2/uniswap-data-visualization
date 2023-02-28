import mappingData from "./mappingData"
import { TransactionData } from "./types"
import { formatTokenSymbol } from "../utils"
import { GetTransactionsDataQuery } from "../generate/uniswap-v3/graphql"

export default (queryTransactionsData: GetTransactionsDataQuery): TransactionData[] => {
  const mappingTransactionsData = mappingData(queryTransactionsData.transactions, [], [])

  return Object.values(mappingTransactionsData).map((transaction) => {
    const currentTransaction = transaction.current
    const transactionType =
      currentTransaction?.mints && currentTransaction?.burns && currentTransaction?.swaps
        ? currentTransaction.mints.length > 0
          ? "add"
          : currentTransaction.burns.length > 0
          ? "remove"
          : "swap"
        : undefined

    const transactionAdvancedData =
      currentTransaction?.mints?.length && currentTransaction?.mints?.length > 0
        ? currentTransaction?.mints[0]
        : currentTransaction?.burns?.length && currentTransaction?.burns?.length > 0
        ? currentTransaction?.burns[0]
        : currentTransaction?.swaps[0]

    const formattedToken0Symbol =
      transactionAdvancedData?.pool.token0.symbol && transactionAdvancedData?.pool.token0.id
        ? formatTokenSymbol(
            transactionAdvancedData?.pool.token0.symbol,
            transactionAdvancedData?.pool.token0.id
          )
        : "-"

    const formattedToken1Symbol =
      transactionAdvancedData?.pool.token1.symbol && transactionAdvancedData?.pool.token1.id
        ? formatTokenSymbol(
            transactionAdvancedData?.pool.token1.symbol,
            transactionAdvancedData?.pool.token1.id
          )
        : "-"

    return {
      hash: currentTransaction?.id ?? "",
      timestamp: currentTransaction?.timestamp,
      type: transactionType,
      token0: formattedToken0Symbol,
      token1: formattedToken1Symbol,
      token0Amount: transactionAdvancedData?.amount0
        ? parseFloat(transactionAdvancedData.amount0)
        : 0,
      token1Amount: transactionAdvancedData?.amount1
        ? parseFloat(transactionAdvancedData.amount1)
        : 0,
      account: transactionAdvancedData?.origin ?? "",
      totalValue: transactionAdvancedData?.amountUSD
        ? parseFloat(transactionAdvancedData.amountUSD)
        : 0,
    }
  })
}

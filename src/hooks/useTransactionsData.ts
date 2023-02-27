import { useCallback } from "react"
import { useLazyQuery } from "@apollo/client"

import { GetTransactionsDataDocument } from "../generate/uniswap-v3/graphql"

export default () => {
  const [getTransactionsQuery] = useLazyQuery(GetTransactionsDataDocument)

  const fetchTransactionsData = useCallback(async () => {
    const { data: queryTransactionData, error } = await getTransactionsQuery()
    const isError = !!error
    if (isError || !queryTransactionData) {
      return {
        data: [],
        isError,
      }
    }
    const formattedData = queryTransactionData.transactions.map((transaction) => {
      const transactionType =
        transaction.mints && transaction.burns && transaction.mints
          ? transaction.mints.length > 0
            ? "add"
            : transaction.burns.length > 0
            ? "remove"
            : "swap"
          : undefined
      const transactionAdvancedData =
        transaction.mints.length > 0
          ? transaction.mints[0]
          : transaction.burns.length > 0
          ? transaction.burns[0]
          : transaction.swaps[0]
      return {
        hash: transaction.id ?? "",
        timestamp: transaction.timestamp,
        type: transactionType,
        token0: transactionAdvancedData?.pool.token0.symbol ?? "-",
        token1: transactionAdvancedData?.pool.token1.symbol ?? "-",
        token0Amount: transactionAdvancedData?.amount0
          ? parseFloat(transactionAdvancedData?.amount0)
          : 0,
        token1Amount: transactionAdvancedData?.amount1
          ? parseFloat(transactionAdvancedData?.amount1)
          : 0,
        account: transactionAdvancedData?.origin ?? "",
        totalValue: transactionAdvancedData?.amountUSD
          ? parseFloat(transactionAdvancedData?.amountUSD)
          : 0,
      }
    })
    return {
      data: formattedData,
      isError,
    }
  }, [getTransactionsQuery])

  return {
    fetchTransactionsData,
  }
}

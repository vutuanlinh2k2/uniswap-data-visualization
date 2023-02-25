import { useCallback } from "react"
import { useLazyQuery } from "@apollo/client"

import { GetTransactionsDataDocument } from "../generate/uniswap-v3/graphql"

export default () => {
  const [getTransactionsQuery] = useLazyQuery(GetTransactionsDataDocument)

  const fetchTransactionsData = useCallback(async () => {
    const { data: queryTransactionData, error } = await getTransactionsQuery()
    const isError = !!error
    const data = queryTransactionData
      ? queryTransactionData.transactions.map((transaction) => {
          const transactionType =
            transaction.mints.length > 0 ? "add" : transaction.burns.length > 0 ? "remove" : "swap"
          const transactionAdvancedData =
            transaction.mints.length > 0
              ? transaction.mints[0]
              : transaction.burns.length > 0
              ? transaction.burns[0]
              : transaction.swaps[0]
          return {
            hash: transaction.id,
            timestamp: transaction.timestamp,
            type: transactionType,
            token0: transactionAdvancedData?.pool.token0.symbol,
            token1: transactionAdvancedData?.pool.token1.symbol,
            token0Amount: parseFloat(transactionAdvancedData?.amount0),
            token1Amount: parseFloat(transactionAdvancedData?.amount1),
            account: transactionAdvancedData?.origin,
            totalValue: parseFloat(transactionAdvancedData?.amountUSD),
          }
        })
      : []
    return {
      data: isError ? [] : data,
      isError,
    }
  }, [getTransactionsQuery])

  return {
    fetchTransactionsData,
  }
}

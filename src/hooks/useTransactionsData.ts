import { useCallback } from "react"
import { useLazyQuery } from "@apollo/client"

import { GetTransactionsDataDocument } from "../generate/uniswap-v3/graphql"
import { TransactionData } from "../types/types"
import { mappingData } from "../utils"

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

    const mappingTransactionsData = mappingData(queryTransactionData.transactions, [], [])

    const formattedData: TransactionData[] = Object.values(mappingTransactionsData).map(
      (transaction) => {
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

        return {
          hash: currentTransaction?.id ?? "",
          timestamp: currentTransaction?.timestamp,
          type: transactionType,
          token0: transactionAdvancedData?.pool.token0.symbol ?? "-",
          token1: transactionAdvancedData?.pool.token1.symbol ?? "-",
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
      }
    )

    return {
      data: formattedData,
      isError,
    }
  }, [getTransactionsQuery])

  return {
    fetchTransactionsData,
  }
}

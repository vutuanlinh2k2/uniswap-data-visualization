import { useState } from "react"
import { useLazyQuery } from "@apollo/client"

import { AppContextType } from "../types/types"
import { UniswapV3Client } from "../apollo"
import { GetTransactionsDataDocument } from "../generate/uniswap-v3/graphql"

export default () => {
  const [transactionsData, setTransactionsData] = useState<AppContextType["transactionsData"]>([])

  const [getTransactionsQuery] = useLazyQuery(GetTransactionsDataDocument, {
    client: UniswapV3Client,
    fetchPolicy: "network-only",
  })

  const fetchTransactionsData = async () => {
    const { data: queryTransactionData } = await getTransactionsQuery()
    if (!queryTransactionData) return
    const formattedData = queryTransactionData.transactions.map((transaction) => {
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
    setTransactionsData(formattedData)
  }
  return {
    transactionsData,
    fetchTransactionsData,
  }
}

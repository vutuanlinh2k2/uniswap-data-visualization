import { useCallback } from "react"
import { useLazyQuery } from "@apollo/client"

import { GetTransactionsDataDocument } from "../generate/uniswap-v3/graphql"
import { formatTransactionsData } from "../data"

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

    const formattedData = formatTransactionsData(queryTransactionData)

    return {
      data: formattedData,
      isError,
    }

  }, [getTransactionsQuery])

  return {
    fetchTransactionsData,
  }
}

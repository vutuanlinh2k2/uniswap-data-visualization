import React, { useContext, useMemo } from "react"
import { Column, usePagination, useSortBy, useTable } from "react-table"

import { AppContext } from "../../context/AppContext"
import { TableTemplate } from "../TableTemplate"
import TokenDescriptionCell from "./TokenDescriptionCell"
import TokenPriceChangeCell from "./TokenPriceChangeCell"
import { TableHeaderText, TableCellText } from "../tableComponents"
import { formatDollar } from "../../utils"
import { TOKENS_HIDE } from "../../constants/hide"

const TopTokensTable = () => {
  const { tokensData, isLoadingTokens, isErrorTokens } = useContext(AppContext)

  const filteredData = useMemo(() => {
    return tokensData.filter((token) => {
      return !TOKENS_HIDE.includes(token.address)
    })
  }, [tokensData])

  const columns = useMemo<ReadonlyArray<Column>>(
    () => [
      {
        Header: "Name",
        Cell: (args) => {
          const { value, row } = args
          const name = row.original["name" as keyof typeof row.original]
          const symbol = row.original["symbol" as keyof typeof row.original]
          return <TokenDescriptionCell name={name} address={value} symbol={symbol} />
        },
        accessor: "address",
        disableSortBy: true,
        width: "40%",
      },
      {
        Header: () => <TableHeaderText headerTitle="Price" />,
        Cell: ({ value }: { value: number }) => (
          <TableCellText isNumber cellText={formatDollar(value)} />
        ),
        accessor: "price",
        width: "15%",
      },
      {
        Header: () => <TableHeaderText headerTitle="Price Change" />,
        Cell: ({ value }: { value: number }) => <TokenPriceChangeCell priceChange={value} />,
        accessor: "priceChange",
        sortType: "basic",
        width: "15%",
      },
      {
        Header: () => <TableHeaderText headerTitle="Volume 24H" />,
        Cell: ({ value }: { value: number }) => (
          <TableCellText isNumber cellText={formatDollar(value)} />
        ),
        accessor: "volume24h",
        width: "15%",
      },
      {
        Header: () => <TableHeaderText headerTitle="TVL" />,
        Cell: ({ value }: { value: number }) => (
          <TableCellText isNumber cellText={formatDollar(value)} />
        ),
        accessor: "tvl",
        width: "15%",
      },
    ],
    []
  )

  const tableInstance = useTable(
    {
      columns,
      data: filteredData,
      disableSortRemove: true,
      initialState: {
        pageSize: 10,
        sortBy: [
          {
            id: "tvl",
            desc: true,
          },
        ],
      },
    },
    useSortBy,
    usePagination
  )
  return (
    <TableTemplate
      tableInstance={tableInstance}
      isLoading={isLoadingTokens}
      isError={isErrorTokens}
      isIndexed
    />
  )
}

export default TopTokensTable

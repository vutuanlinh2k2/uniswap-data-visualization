import React, { useContext, useMemo } from "react"
import { Column, usePagination, useSortBy, useTable } from "react-table"

import { AppContext } from "../../AppContext"
import TableTemplate from "./TableTemplate"
import { TableHeaderText, TableCellText } from "./TableText"
import { formatDollar } from "../../utils/numbers"

const TokenNameCell = ({ name, symbol }: { name: string; symbol: string }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="w-6 h-6 bg-white rounded-full" />
      <p>{name}</p>
      <p className="text-grey-secondary-text">({symbol})</p>
    </div>
  )
}

const emptyData: any[] = []

const TopTokensTable = () => {
  const { tokensData, ethPriceUsd } = useContext(AppContext)

  const data = useMemo(() => {
    return tokensData.map((token, i) => {
      return {
        ...token,
        id: i + 1,
      }
    })
  }, [tokensData])

  const columns = useMemo<ReadonlyArray<Column>>(
    () => [
      {
        Header: "#",
        Cell: ({ value }: { value: number }) => <p>{value}</p>,
        accessor: "id",
        disableSortBy: true,
      },
      {
        Header: "Name",
        Cell: (args) => {
          const { value, row } = args
          const symbol = row.original["symbol" as keyof typeof row.original]
          return <TokenNameCell name={value} symbol={symbol} />
        },
        accessor: "name",
      },
      {
        Header: () => <TableHeaderText headerTitle="Price" />,
        Cell: ({ value }: { value: number }) => (
          <TableCellText cellText={ethPriceUsd ? formatDollar(value * ethPriceUsd) : ""} />
        ),
        accessor: "derivedETH",
      },
      {
        Header: () => <TableHeaderText headerTitle="TVL" />,
        Cell: ({ value }: { value: number }) => <TableCellText cellText={formatDollar(value)} />,
        accessor: "totalValueLockedUSD",
      },
    ],
    [ethPriceUsd]
  )

  const tableInstance = useTable(
    {
      columns,
      data: emptyData,
      initialState: {
        pageSize: 10,
      },
    },
    useSortBy,
    usePagination
  )
  return <TableTemplate tableInstance={tableInstance} />
}

export default TopTokensTable

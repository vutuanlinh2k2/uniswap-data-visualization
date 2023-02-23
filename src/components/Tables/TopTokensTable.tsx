import React, { useContext, useMemo } from "react"
import { Column, usePagination, useSortBy, useTable } from "react-table"

import { AppContext } from "../../AppContext"
import TableTemplate from "./TableTemplate"
import { formatDollar } from "../../utils/numbers"

const TokenNameCell = ({ name, row, column }: { name: string; row: any; column: any }) => {
  const symbol: string = row.original[column.accessorSymbol]

  return (
    <div className="flex items-center gap-2">
      <div className="w-6 h-6 bg-white rounded-full" />
      <p>{name}</p>
      <p className="text-grey-secondary-text">({symbol})</p>
    </div>
  )
}

const TopTokensTable = () => {
  const { tokensData } = useContext(AppContext)

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
        Header: () => <span>#</span>,
        Cell: ({ value }: { value: number }) => <p>{value}</p>,
        accessor: "id",
        disableSortBy: true,
      },
      {
        Header: () => <span>Name</span>,
        Cell: (args) => {
          const { value, row, column } = args
          return <TokenNameCell name={value} row={row} column={column} />
        },
        accessor: "name",
        accessorSymbol: "symbol",
      },
      {
        Header: () => <p className="text-right w-full">TVL</p>,
        Cell: ({ value }: { value: number }) => <p className="text-right">{formatDollar(value)}</p>,
        accessor: "totalValueLockedUSD",
      },
    ],
    []
  )

  const tableInstance = useTable(
    {
      columns,
      data,
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

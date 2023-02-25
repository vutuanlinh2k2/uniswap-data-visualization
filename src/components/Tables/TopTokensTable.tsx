import React, { useContext, useMemo } from "react"
import { Column, usePagination, useSortBy, useTable } from "react-table"

import { AppContext } from "../../AppContext"
import TableTemplate from "./TableTemplate"
import { TableHeaderText, TableCellText } from "./TableText"
import { formatDollar } from "../../utils/numbers"

const TokenDescriptionCell = ({ name, symbol }: { name: string; symbol: string }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="w-6 h-6 bg-white rounded-full" />
      <p>{name}</p>
      <p className="text-grey-secondary-text">({symbol})</p>
    </div>
  )
}

const TokenPriceChangeCell = ({ priceChange }: { priceChange: number }) => {
  const rounded = Math.round(priceChange * 100) / 100
  const className = rounded >= 0 ? " text-green-text text-right" : " text-red-text text-right"
  return <p className={className}>{rounded}%</p>
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
          return <TokenDescriptionCell name={value} symbol={symbol} />
        },
        accessor: "name",
        disableSortBy: true,
      },
      {
        Header: () => <TableHeaderText headerTitle="Price" />,
        Cell: ({ value }: { value: number }) => <TableCellText cellText={formatDollar(value)} />,
        accessor: "price",
      },
      {
        Header: () => <TableHeaderText headerTitle="Price Change" />,
        Cell: ({ value }: { value: number }) => <TokenPriceChangeCell priceChange={value} />,
        accessor: "priceChange",
        sortType: "basic",
      },
      {
        Header: () => <TableHeaderText headerTitle="Volume 24H" />,
        Cell: ({ value }: { value: number }) => <TableCellText cellText={formatDollar(value)} />,
        accessor: "volume24h",
      },
      {
        Header: () => <TableHeaderText headerTitle="TVL" />,
        Cell: ({ value }: { value: number }) => <TableCellText cellText={formatDollar(value)} />,
        accessor: "tvl",
      },
    ],
    []
  )

  const tableInstance = useTable(
    {
      columns,
      data: data,
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

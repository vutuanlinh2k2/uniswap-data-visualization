import React, { useContext, useMemo } from "react"
import { Column, usePagination, useSortBy, useTable } from "react-table"

import { AppContext } from "../../AppContext"
import { TableTemplate, TableHeaderText, TableCellText, CryptoIcon } from "../tableComponents"
import { formatDollar } from "../../utils"

const TokenDescriptionCell = ({
  name,
  address,
  symbol,
}: {
  name: string
  address: string
  symbol: string
}) => {
  return (
    <div className="flex items-center gap-2">
      <CryptoIcon address={address} size={24} />
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
  const { tokensData, isLoadingTokens, isErrorTokens } = useContext(AppContext)

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
          const name = row.original["name" as keyof typeof row.original]
          const symbol = row.original["symbol" as keyof typeof row.original]
          return <TokenDescriptionCell name={name} address={value} symbol={symbol} />
        },
        accessor: "address",
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
  return (
    <TableTemplate
      tableInstance={tableInstance}
      isLoading={isLoadingTokens}
      isError={isErrorTokens}
    />
  )
}

export default TopTokensTable

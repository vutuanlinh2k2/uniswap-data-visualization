import React, { useContext, useMemo } from "react"
import { Column, usePagination, useSortBy, useTable } from "react-table"
import { BsArrowUp, BsArrowDown } from "react-icons/bs"

import { AppContext } from "../../AppContext"
import { TableTemplate, TableHeaderText, TableCellText, CryptoIcon } from "../tableComponents"
import { formatDollar } from "../../utils"
import { TOKENS_HIDE } from "../../constants/hide"

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
      <p className="text-grey-secondary">({symbol})</p>
    </div>
  )
}

const TokenPriceChangeCell = ({ priceChange }: { priceChange: number }) => {
  const rounded = Math.round(priceChange * 100) / 100
  const className = rounded >= 0 ? "text-green" : "text-red"
  return (
    <div className="flex items-center justify-end gap-0.5 table-number">
      {rounded === 0 ? null : rounded > 0 ? (
        <BsArrowUp className="text-green" />
      ) : (
        <BsArrowDown className="text-red" />
      )}
      <p className={className}>{rounded === 0 ? "0.00" : Math.abs(rounded)}%</p>
    </div>
  )
}

const TopTokensTable = () => {
  const { tokensData, isLoadingTokens, isErrorTokens } = useContext(AppContext)
  console.log("tokensData :", tokensData)

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

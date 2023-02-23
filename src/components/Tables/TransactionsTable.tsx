import React, { useContext, useMemo } from "react"
import { Column, usePagination, useSortBy, useTable, useFilters, ColumnInstance } from "react-table"

import { AppContext } from "../../AppContext"
import TableTemplate from "./TableTemplate"
import { formatDollar, formatNumber } from "../../utils/numbers"
import { getTimeSinceEpoch } from "../../utils/time"
import { shortenHash } from "../../utils/shorten"

import { getEtherscanTransaction, getEtherScanAccount } from "../../utils/etherscan"

const TransactionDescriptionCell = ({
  value,
  row,
  column,
}: {
  value: string
  row: any
  column: any
}) => {
  const type = value
  const hash: string = row.original[column.accessorHash]
  const token0: string = row.original[column.accessorToken0]
  const token1: string = row.original[column.accessorToken1]
  const verb = type === "add" ? "Add" : type === "remove" ? "Remove" : "Swap"
  const preposition = type === "add" || type === "remove" ? "and" : "for"
  return (
    <a
      href={getEtherscanTransaction(hash)}
      className="text-pink"
    >{`${verb} ${token0} ${preposition} ${token1}`}</a>
  )
}

const TokenAmountCell0 = ({ value, row, column }: { value: number; row: any; column: any }) => {
  const token0Amount: number = row.original[column.accessorToken0Amount]
  return (
    <p className="text-right">
      {`${formatNumber(Math.abs(token0Amount))} ${value}`}
    </p>
  )
}

const TokenAmountCell1 = ({ value, row, column }: { value: number; row: any; column: any }) => {
  const token1Amount: number = row.original[column.accessorToken1Amount]
  return (
    <p className="text-right">
      {`${formatNumber(Math.abs(token1Amount))} ${value}`}
    </p>
  )
}

const filterOptions = [
  {
    value: undefined,
    text: "All",
  },
  {
    value: "swap",
    text: "Swaps",
  },
  {
    value: "add",
    text: "Adds",
  },
  {
    value: "remove",
    text: "Removes",
  },
]

const TransactionFilter: React.FC<{ column: ColumnInstance }> = ({
  column: { filterValue, setFilter },
}) => {
  const unselectedClassName = "text-grey-secondary-text"
  return (
    <div className="flex gap-3 cursor-pointer">
      {filterOptions.map((option) => (
        <p
          key={option.value}
          className={filterValue === option.value ? "" : unselectedClassName}
          onClick={() => {
            setFilter(option.value)
          }}
        >
          {option.text}
        </p>
      ))}
    </div>
  )
}

const TransactionsTable = () => {
  const { transactionsData } = useContext(AppContext)
  console.log("transactionsData :", transactionsData)

  const columns = useMemo<ReadonlyArray<Column>>(
    () => [
      {
        Header: "",
        Cell: (args) => {
          const { value, row, column } = args
          return <TransactionDescriptionCell value={value} row={row} column={column} />
        },
        accessor: "type",
        accessorHash: "hash",
        accessorToken0: "token0",
        accessorToken1: "token1",
        disableSortBy: true,
        Filter: (args) => <TransactionFilter {...args} />,
      },
      {
        Header: () => <p className="text-right w-full text-grey-primary-text">Total Value</p>,
        Cell: ({ value }: { value: number }) => <p className="text-right">{formatDollar(value)}</p>,
        accessor: "totalValue",
        disableFilters: true,
      },
      {
        Header: () => <p className="text-right w-full text-grey-primary-text">Token Amount</p>,
        Cell: (args) => {
          const { value, row, column } = args
          return <TokenAmountCell0 value={value} row={row} column={column} />
        },
        accessor: "token0",
        accessorToken0Amount: "token0Amount",
        disableFilters: true,
      },
      {
        Header: () => <p className="text-right w-full text-grey-primary-text">Token Amount</p>,
        Cell: (args) => {
          const { value, row, column } = args
          return <TokenAmountCell1 value={value} row={row} column={column} />
        },
        accessor: "token1",
        accessorToken1Amount: "token1Amount",
        disableFilters: true,
      },
      {
        Header: () => <p className="text-right w-full text-grey-primary-text">Account</p>,
        Cell: ({ value }: { value: string }) => (
          <p className="text-right">
            <a href={getEtherScanAccount(value)} className="text-lg text-pink">
              {shortenHash(value)}
            </a>
          </p>
        ),
        accessor: "account",
        disableFilters: true,
      },
      {
        Header: () => <p className="text-right w-full text-grey-primary-text">Time</p>,
        Cell: ({ value }: { value: number }) => (
          <p className="text-right">{getTimeSinceEpoch(value)}</p>
        ),
        accessor: "timestamp",
        disableFilters: true,
      },
    ],
    []
  )

  const tableInstance = useTable(
    {
      columns,
      data: transactionsData,
      initialState: {
        pageSize: 10,
      },
    },
    useFilters,
    // useGlobalFilter,
    useSortBy,
    usePagination
  )

  return <TableTemplate tableInstance={tableInstance} />
}

export default TransactionsTable

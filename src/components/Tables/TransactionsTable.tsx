import React, { useContext, useMemo } from "react"
import { Column, usePagination, useSortBy, useTable, useFilters, ColumnInstance } from "react-table"

import { AppContext } from "../../AppContext"
import { TableTemplate, TableHeaderText, TableCellText } from "../tableComponents"
import {
  formatDollar,
  formatNumber,
  getTimeSinceEpoch,
  shortenHash,
  getEtherscanTransaction,
  getEtherScanAccount,
} from "../../utils"

const transactionFilterOptions = [
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

const TransactionDescriptionCell = ({
  type,
  hash,
  token0,
  token1,
}: {
  type: string | undefined
  hash: string
  token0: string
  token1: string
}) => {
  if (!type || hash === "") return <p className="text-pink">-</p>
  const verb = type === "add" ? "Add" : type === "remove" ? "Remove" : "Swap"
  const preposition = type === "add" || type === "remove" ? "and" : "for"
  return (
    <a
      href={getEtherscanTransaction(hash)}
      className="text-pink"
    >{`${verb} ${token0} ${preposition} ${token1}`}</a>
  )
}

const TokenAmountCell = ({ symbol, amount }: { symbol: string; amount: number }) => {
  return <p className="text-right table-number">{`${formatNumber(Math.abs(amount))} ${symbol}`}</p>
}

const TransactionFilter: React.FC<{ column: ColumnInstance }> = ({
  column: { filterValue, setFilter },
}) => {
  const unselectedClassName = "text-grey-secondary"
  return (
    <div className="flex gap-3 cursor-pointer">
      {transactionFilterOptions.map((option, i) => (
        <p
          key={i}
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
  const { transactionsData, isTransactionsLoading, isTransactionsError } = useContext(AppContext)

  const columns = useMemo<ReadonlyArray<Column>>(
    () => [
      {
        Header: "",
        Cell: (args) => {
          const { value, row } = args
          const hash = row.original["hash" as keyof typeof row.original]
          const token0 = row.original["token0" as keyof typeof row.original]
          const token1 = row.original["token1" as keyof typeof row.original]
          return (
            <TransactionDescriptionCell type={value} hash={hash} token0={token0} token1={token1} />
          )
        },
        accessor: "type",
        disableSortBy: true,
        Filter: (args) => <TransactionFilter {...args} />,
      },
      {
        Header: () => <TableHeaderText headerTitle="Total Value" />,
        Cell: ({ value }: { value: number }) => (
          <TableCellText isNumber cellText={formatDollar(value)} />
        ),
        accessor: "totalValue",
        disableFilters: true,
      },
      {
        Header: () => <TableHeaderText headerTitle="Token Amount" />,
        Cell: (args) => {
          const { value, row } = args
          const amount = row.original["token0Amount" as keyof typeof row.original]
          return <TokenAmountCell symbol={value} amount={amount} />
        },
        accessor: "token0",
        disableFilters: true,
      },
      {
        Header: () => <TableHeaderText headerTitle="Token Amount" />,
        Cell: (args) => {
          const { value, row } = args
          const amount = row.original["token1Amount" as keyof typeof row.original]
          return <TokenAmountCell symbol={value} amount={amount} />
        },
        accessor: "token1",
        disableFilters: true,
      },
      {
        Header: () => <TableHeaderText headerTitle="Account" />,
        Cell: ({ value }: { value: string }) => (
          <p className="text-right table-number">
            <a href={getEtherScanAccount(value)} className="text-lg text-pink">
              {shortenHash(value)}
            </a>
          </p>
        ),
        accessor: "account",
        disableFilters: true,
      },
      {
        Header: () => <TableHeaderText headerTitle="Time" />,
        Cell: ({ value }: { value: number | undefined }) =>
          value ? (
            <TableCellText cellText={getTimeSinceEpoch(value)} />
          ) : (
            <p className="text-r">-</p>
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
      disableSortRemove: true,
      initialState: {
        pageSize: 10,
        sortBy: [
          {
            id: "timestamp",
            desc: true,
          },
        ],
      },
    },
    useFilters,
    useSortBy,
    usePagination
  )

  return (
    <TableTemplate
      tableInstance={tableInstance}
      isLoading={isTransactionsLoading}
      isError={isTransactionsError}
    />
  )
}

export default TransactionsTable

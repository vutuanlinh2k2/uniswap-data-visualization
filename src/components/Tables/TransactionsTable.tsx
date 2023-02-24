import React, { useContext, useMemo } from "react"
import { Column, usePagination, useSortBy, useTable, useFilters, ColumnInstance } from "react-table"

import { AppContext } from "../../AppContext"
import TableTemplate from "./TableTemplate"
import { formatDollar, formatNumber } from "../../utils/numbers"
import { getTimeSinceEpoch } from "../../utils/time"
import { shortenHash } from "../../utils/shorten"
import { getEtherscanTransaction, getEtherScanAccount } from "../../utils/etherscan"
import { transactionFilterOptions } from "../../constants/transactions"

const TransactionDescriptionCell = ({
  type,
  hash,
  token0,
  token1,
}: {
  type: string
  hash: string
  token0: string
  token1: string
}) => {
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
  return <p className="text-right">{`${formatNumber(Math.abs(amount))} ${symbol}`}</p>
}

const TransactionFilter: React.FC<{ column: ColumnInstance }> = ({
  column: { filterValue, setFilter },
}) => {
  const unselectedClassName = "text-grey-secondary-text"
  return (
    <div className="flex gap-3 cursor-pointer">
      {transactionFilterOptions.map((option) => (
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
        Header: () => <p className="text-right w-full text-grey-primary-text">Total Value</p>,
        Cell: ({ value }: { value: number }) => <p className="text-right">{formatDollar(value)}</p>,
        accessor: "totalValue",
        disableFilters: true,
      },
      {
        Header: () => <p className="text-right w-full text-grey-primary-text">Token Amount</p>,
        Cell: (args) => {
          const { value, row } = args
          const amount = row.original["token0Amount" as keyof typeof row.original]
          return <TokenAmountCell symbol={value} amount={amount} />
        },
        accessor: "token0",
        disableFilters: true,
      },
      {
        Header: () => <p className="text-right w-full text-grey-primary-text">Token Amount</p>,
        Cell: (args) => {
          const { value, row } = args
          const amount = row.original["token1Amount" as keyof typeof row.original]
          return <TokenAmountCell symbol={value} amount={amount} />
        },
        accessor: "token1",
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
    useSortBy,
    usePagination
  )

  return <TableTemplate tableInstance={tableInstance} />
}

export default TransactionsTable

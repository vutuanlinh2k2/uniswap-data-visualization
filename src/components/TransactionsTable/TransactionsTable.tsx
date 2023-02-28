import React, { useContext, useMemo } from "react"
import { Column, usePagination, useSortBy, useTable, useFilters } from "react-table"

import { AppContext } from "../../context/AppContext"
import { TableTemplate } from "../TableTemplate"
import TransactionDescriptionCell from "./TransactionDescriptionCell"
import TokenAmountCell from "./TokenAmountCell"
import TransactionsFilter from "./TransactionsFilter"
import { TableHeaderText, TableCellText } from "../tableComponents"
import { formatDollar, getTimeSinceEpoch, shortenHash, getEtherScanAccount } from "../../utils"

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
        Filter: (args) => <TransactionsFilter {...args} />,
        width: "25%",
      },
      {
        Header: () => <TableHeaderText headerTitle="Total Value" />,
        Cell: ({ value }: { value: number }) => (
          <TableCellText isNumber cellText={formatDollar(value)} />
        ),
        accessor: "totalValue",
        disableFilters: true,
        width: "15%",
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
        width: "15%",
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
        width: "15%",
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
        width: "15%",
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
        width: "15%",
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

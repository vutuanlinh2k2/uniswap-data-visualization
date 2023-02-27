import React, { useContext, useMemo } from "react"
import { Column, usePagination, useSortBy, useTable } from "react-table"

import { AppContext } from "../../AppContext"
import { TableTemplate, TableHeaderText, TableCellText, CryptoIcon } from "../tableComponents"
import { formatDollar, formatNumber } from "../../utils"
import { POOLS_HIDE } from "../../constants/hide"

const PoolDescriptionCell = ({
  token0Symbol,
  token1Symbol,
  token0Address,
  token1Address,
  feeTier,
}: {
  token0Symbol: string
  token1Symbol: string
  token0Address: string
  token1Address: string
  feeTier: number
}) => {
  return (
    <div className="flex gap-2 items-center ">
      <div className="flex">
        <CryptoIcon address={token0Address} size={18} />
        <CryptoIcon address={token1Address} size={18} />
      </div>
      <p>{`${token0Symbol}/${token1Symbol}`}</p>
      <p className="bg-grey-tertiary px-1.5 py-0.5 rounded-lg table-number text-sm">
        {feeTier / 10000}%
      </p>
    </div>
  )
}

const TopPoolsTable = () => {
  const { poolsData, isLoadingPools, isErrorPools } = useContext(AppContext)

  const filteredData = useMemo(() => {
    return poolsData.filter((pool) => {
      return !POOLS_HIDE.includes(pool.id)
    })
  }, [poolsData])

  const columns = useMemo<ReadonlyArray<Column>>(
    () => [
      {
        Header: "Pool",
        Cell: (args) => {
          const { value, row } = args
          const token0Symbol = row.original["token0Symbol" as keyof typeof row.original]
          const token1Symbol = row.original["token1Symbol" as keyof typeof row.original]
          const token0Address = row.original["token0Address" as keyof typeof row.original]
          const token1Address = row.original["token1Address" as keyof typeof row.original]
          return (
            <PoolDescriptionCell
              token0Symbol={token0Symbol}
              token1Symbol={token1Symbol}
              token0Address={token0Address}
              token1Address={token1Address}
              feeTier={value}
            />
          )
        },
        accessor: "feeTier",
        disableSortBy: true,
        width: "55%",
      },
      {
        Header: () => <TableHeaderText headerTitle="TVL" />,
        Cell: ({ value }: { value: number }) => (
          <TableCellText isNumber cellText={formatNumber(value)} />
        ),
        accessor: "tvl",
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
        Header: () => <TableHeaderText headerTitle="Volume 7D" />,
        Cell: ({ value }: { value: number }) => (
          <TableCellText isNumber cellText={formatDollar(value)} />
        ),
        accessor: "volume7d",
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
      isLoading={isLoadingPools}
      isError={isErrorPools}
      isIndexed
    />
  )
}

export default TopPoolsTable

import React, { useContext, useMemo } from "react"
import { Column, usePagination, useSortBy, useTable } from "react-table"

import { AppContext } from "../../context/AppContext"
import { TableTemplate } from "../TableTemplate"
import PoolDescriptionCell from "./PoolDescriptionCell"
import { TableHeader, TableCell } from "../tableComponents"
import { formatDollar, formatNumber } from "../../utils"
import { POOLS_HIDE } from "../../constants/hide"

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
        Header: () => <TableHeader headerText="TVL" />,
        Cell: ({ value }: { value: number }) => (
          <TableCell isNumber cellText={formatNumber(value)} />
        ),
        accessor: "tvl",
        width: "15%",
      },
      {
        Header: () => <TableHeader headerText="Volume 24H" />,
        Cell: ({ value }: { value: number }) => (
          <TableCell isNumber cellText={formatDollar(value)} />
        ),
        accessor: "volume24h",
        width: "15%",
      },
      {
        Header: () => <TableHeader headerText="Volume 7D" />,
        Cell: ({ value }: { value: number }) => (
          <TableCell isNumber cellText={formatDollar(value)} />
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

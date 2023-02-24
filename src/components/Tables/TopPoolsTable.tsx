import React, { useContext, useMemo } from "react"
import { Column, usePagination, useSortBy, useTable } from "react-table"

import { AppContext } from "../../AppContext"
import TableTemplate from "./TableTemplate"
import { TableHeaderText, TableCellText } from "./TableText"
import { formatDollar, formatNumber } from "../../utils/numbers"

const PoolDescriptionCell = ({
  token0,
  token1,
  feeTier,
}: {
  token0: string
  token1: string
  feeTier: number
}) => {
  return (
    <div className="flex gap-2 items-center ">
      <div className="flex">
        <div className="w-4 h-4 bg-white rounded-full" />
        <div className="w-4 h-4 bg-white rounded-full" />
      </div>
      <p>{`${token0}/${token1}`}</p>
      <p className="bg-grey-secondary-text px-1 py-0.5 rounded-lg">{feeTier / 10000}%</p>
    </div>
  )
}

const TopPoolsTable = () => {
  const { poolsData } = useContext(AppContext)

  const data = useMemo(() => {
    return poolsData.map((token, i) => {
      return {
        ...token,
        id: i + 1,
      }
    })
  }, [poolsData])

  const columns = useMemo<ReadonlyArray<Column>>(
    () => [
      {
        Header: "#",
        Cell: ({ value }: { value: number }) => <p>{value}</p>,
        accessor: "id",
        disableSortBy: true,
      },
      {
        Header: "Pool",
        Cell: (args) => {
          const { value, row } = args
          const token0 = row.original["token0" as keyof typeof row.original]
          const token1 = row.original["token1" as keyof typeof row.original]
          return <PoolDescriptionCell token0={token0} token1={token1} feeTier={value} />
        },
        accessor: "feeTier",
        disableSortBy: true,
      },
      {
        Header: () => <TableHeaderText headerTitle="TVL" />,
        Cell: ({ value }: { value: number }) => <TableCellText cellText={formatNumber(value)} />,
        accessor: "tvl",
      },
      {
        Header: () => <TableHeaderText headerTitle="Volume (24h)" />,
        Cell: ({ value }: { value: number }) => <TableCellText cellText={formatDollar(value)} />,
        accessor: "volume24h",
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

export default TopPoolsTable

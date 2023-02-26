import React, { useContext, useMemo } from "react"
import { Column, usePagination, useSortBy, useTable } from "react-table"

import { AppContext } from "../../AppContext"
import { TableTemplate, TableHeaderText, TableCellText, CryptoIcon } from "../tableComponents"
import { formatDollar, formatNumber } from "../../utils"

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
      <p className="bg-grey-secondary-text px-1 py-0.5 rounded-lg">{feeTier / 10000}%</p>
    </div>
  )
}

const TopPoolsTable = () => {
  const { poolsData, isLoadingPools, isErrorPools } = useContext(AppContext)

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

  return (
    <TableTemplate
      tableInstance={tableInstance}
      isLoading={isLoadingPools}
      isError={isErrorPools}
    />
  )
}

export default TopPoolsTable

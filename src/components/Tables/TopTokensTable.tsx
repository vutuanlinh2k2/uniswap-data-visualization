import React, { useMemo } from "react"
import { Column, usePagination, useSortBy, useTable } from "react-table"

import TableTemplate from "./TableTemplate"

const data = [
    {
        id: 1,
        name: "Uniswap",
    },
    {
        id: 2,
        name: "Uniswap",
    },
    {
        id: 3,
        name: "Uniswap",
    },
    {
        id: 4,
        name: "Uniswap",
    },
    {
        id: 5,
        name: "Uniswap",
    },
    {
        id: 6,
        name: "Uniswap",
    },
    {
        id: 7,
        name: "Uniswap",
    },
    {
        id: 8,
        name: "Uniswap",
    },
    {
        id: 9,
        name: "Uniswap",
    },
    {
        id: 10,
        name: "Uniswap",
    },
    {
        id: 11,
        name: "Uniswap",
    },
    {
        id: 12,
        name: "Uniswap",
    },
    {
        id: 13,
        name: "Uniswap",
    },
    {
        id: 14,
        name: "Uniswap",
    },
    {
        id: 15,
        name: "Uniswap",
    },
    {
        id: 16,
        name: "Uniswap",
    },
    {
        id: 17,
        name: "Uniswap",
    },
    {
        id: 18,
        name: "Uniswap",
    },
    {
        id: 19,
        name: "Uniswap",
    },
    {
        id: 20,
        name: "Uniswap",
    },
    {
        id: 21,
        name: "Uniswap",
    },
    {
        id: 22,
        name: "Uniswap",
    },
]

const TopTokensTable = () => {
    const columns = useMemo<ReadonlyArray<Column>>(
        () => [
            {
                Header: () => <span>#</span>,
                Cell: ({ value }: { value: number }) => <p>{value}</p>,
                accessor: "id",
                // disableSortBy: false,
            },
            {
                Header: () => <span>Name</span>,
                Cell: ({ value }: { value: string }) => <p>{value}</p>,
                accessor: "name",
                disableSortBy: true,
            },
        ],
        []
    )

    const tableInstance = useTable(
        {
            columns,
            data,
            initialState: {
                pageSize: 10,
            },
        },
        useSortBy,
        usePagination
    )

    return <TableTemplate tableInstance={tableInstance} />
}

export default TopTokensTable

import React from "react"
import { useTable } from "react-table"

import { BsArrowUp, BsArrowDown, BsArrowLeft, BsArrowRight } from "react-icons/bs"

export interface TableProps {
    tableInstance: ReturnType<typeof useTable>
    filterable?: boolean
}

const TableTemplate: React.FC<TableProps> = ({ tableInstance, filterable = false }) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        state: { pageIndex },
        nextPage,
        previousPage,
        canPreviousPage,
        canNextPage,
        pageCount,
    } = tableInstance
    return (
        <div className="pt-1 pb-4 px-4 my-4 bg-primary rounded-2xl">
            <table {...getTableProps()} className="w-full">
                <thead className="text-grey-secondary-text">
                    {headerGroups.map((headerGroup, i) => {
                        return (
                            <tr {...headerGroup.getHeaderGroupProps()} key={i}>
                                {headerGroup.headers.map((column, i) => {
                                    return (
                                        <th
                                            {...column.getHeaderProps(
                                                column.getSortByToggleProps()
                                            )}
                                            key={i}
                                            scope="col"
                                            className="hover:opacity-80 border-b border-secondary"
                                        >
                                            <div className="flex items-center gap-2 py-3">
                                                {column.render("Header")}
                                                <span>
                                                    {column.isSorted ? (
                                                        column.isSortedDesc ? (
                                                            <BsArrowDown />
                                                        ) : (
                                                            <BsArrowUp />
                                                        )
                                                    ) : (
                                                        ""
                                                    )}
                                                </span>
                                                <div>
                                                    {filterable && column.canFilter
                                                        ? column.render("Filter")
                                                        : null}
                                                </div>
                                            </div>
                                        </th>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </thead>
                <tbody {...getTableBodyProps()} className="">
                    {page.map((row, idx) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()} key={idx} className="hover:opacity-80">
                                {row.cells.map((cell, idx) => {
                                    return (
                                        <td
                                            {...cell.getCellProps()}
                                            className="py-3 border-b border-secondary"
                                            //   className="whitespace-nowrap px-2 md:px-4 py-2 md:py-4"
                                            key={idx}
                                        >
                                            {cell.render("Cell")}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div className="flex justify-center">
                <div className="flex items-center gap-4 mt-3 mx-auto">
                    <BsArrowLeft
                        color="rgb(33,114,228)"
                        className={!canPreviousPage ? "opacity-50" : ""}
                        onClick={!canPreviousPage ? undefined : () => previousPage()}
                    />
                    <p>
                        Page <span className="font-medium">{pageIndex + 1}</span> of{" "}
                        <span className="font-medium">{pageCount}</span>
                    </p>
                    <BsArrowRight
                        color="rgb(33,114,228)"
                        className={!canNextPage ? "opacity-50" : ""}
                        onClick={!canNextPage ? undefined : () => nextPage()}
                    />
                </div>
            </div>
        </div>
    )
}

export default TableTemplate

import React from "react"
import { useTable } from "react-table"
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import { BsArrowUp, BsArrowDown, BsArrowLeft, BsArrowRight } from "react-icons/bs"

export interface TableProps {
  tableInstance: ReturnType<typeof useTable>
  isLoading: boolean
  isError: boolean
}

const TableTemplate: React.FC<TableProps> = ({ tableInstance, isLoading, isError }) => {
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

  if (isError) {
    return <p>There was an error when fetching the data</p>
  }

  return (
    <div className="pt-1 pb-4 px-4 my-4 bg-primary rounded-2xl">
      {!isLoading ? (
        <>
          <table {...getTableProps()} className="w-full">
            <thead className="text-grey-secondary-text">
              {headerGroups.map((headerGroup, i) => {
                return (
                  <tr {...headerGroup.getHeaderGroupProps()} key={i}>
                    {headerGroup.headers.map((column, i) => {
                      return (
                        <th
                          {...column.getHeaderProps(column.getSortByToggleProps())}
                          key={i}
                          scope="col"
                          className={
                            !column.canFilter
                              ? "hover:opacity-60 border-b border-secondary cursor-pointer"
                              : "border-b border-secondary"
                          }
                        >
                          <div className="flex items-center py-3">
                            {column.render("Header")}
                            <span className="mr-1">
                              {column.isSorted ? (
                                column.isSortedDesc ? (
                                  <BsArrowDown />
                                ) : (
                                  <BsArrowUp />
                                )
                              ) : null}
                            </span>
                            <div>{column.canFilter ? column.render("Filter") : null}</div>
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
                  <tr {...row.getRowProps()} key={idx} className="hover:opacity-60 cursor-pointer">
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
        </>
      ) : (
        <div className="flex flex-col gap-2.5 mt-2">
          <Skeleton
            baseColor="rgb(31, 33, 39)"
            highlightColor="rgb(25,27,31)"
            height={40}
            borderRadius="1rem"
            duration={2.5}
          />
          <Skeleton
            baseColor="rgb(31, 33, 39)"
            highlightColor="rgb(25,27,31)"
            height={40}
            borderRadius="1rem"
            duration={2.5}
          />
          <Skeleton
            baseColor="rgb(31, 33, 39)"
            highlightColor="rgb(25,27,31)"
            height={40}
            borderRadius="1rem"
            duration={2.5}
          />
        </div>
      )}
    </div>
  )
}

export default TableTemplate

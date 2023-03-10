import React from "react"
import { useTable } from "react-table"
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import { BsArrowUp, BsArrowDown, BsArrowLeft, BsArrowRight } from "react-icons/bs"

export interface TableProps {
  tableInstance: ReturnType<typeof useTable>
  isLoading: boolean
  isError: boolean
  isIndexed?: boolean
}

const TableWrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className="p-3.5 my-4 bg-primary rounded-2xl">{children}</div>
}

const TableTemplate: React.FC<TableProps> = ({ tableInstance, isLoading, isError, isIndexed }) => {
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

  if (isLoading) {
    return (
      <TableWrapper>
        <div className="flex flex-col gap-2.5">
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
      </TableWrapper>
    )
  }

  if (isError) {
    return (
      <TableWrapper>
        <p className="text-center">There was an error when fetching the data</p>
      </TableWrapper>
    )
  }

  return (
    <TableWrapper>
      <table {...getTableProps()} className="w-full">
        <thead className="text-grey-secondary">
          {headerGroups.map((headerGroup, i) => {
            return (
              <tr {...headerGroup.getHeaderGroupProps()} key={i}>
                {isIndexed && (
                  <th
                    colSpan={1}
                    role="columnheader"
                    scope="col"
                    className="hover:opacity-60 border-b border-secondary cursor-pointer flex w-8"
                  >
                    <div className="flex items-center pb-3">#</div>
                  </th>
                )}
                {headerGroup.headers.map((column, i) => {
                  return (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      {...column.getHeaderProps({
                        style: {
                          width: column.width,
                        },
                      })}
                      key={i}
                      scope="col"
                      className={
                        !column.canFilter
                          ? "hover:opacity-60 border-b border-secondary cursor-pointer"
                          : "border-b border-secondary"
                      }
                    >
                      <div className="flex items-center pb-3">
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
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()} key={i} className="hover:opacity-60 cursor-pointer">
                {isIndexed && (
                  <td className="py-3 border-b border-secondary w-8">{i + 1 + pageIndex * 10}</td>
                )}
                {row.cells.map((cell, i) => {
                  return (
                    <td {...cell.getCellProps()} className="py-3 border-b border-secondary" key={i}>
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
    </TableWrapper>
  )
}

export default TableTemplate

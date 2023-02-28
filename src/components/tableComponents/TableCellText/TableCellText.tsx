import React from "react"

const TableCellText = ({
  cellText,
  isNumber = false,
}: {
  cellText: string
  isNumber?: boolean
}) => {
  return <p className={isNumber ? "table-number text-right" : "text-right"}>{cellText}</p>
}

export default TableCellText

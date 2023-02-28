import React from "react"

const TableCell = ({ cellText, isNumber = false }: { cellText: string; isNumber?: boolean }) => {
  return <p className={isNumber ? "table-number text-right" : "text-right"}>{cellText}</p>
}

export default TableCell

import React from "react"

export const TableHeaderText = ({ headerTitle }: { headerTitle: string }) => {
  return <p className="text-right w-full text-grey-primary">{headerTitle}</p>
}

export const TableCellText = ({
  cellText,
  isNumber = false,
}: {
  cellText: string
  isNumber?: boolean
}) => {
  return <p className={isNumber ? "table-number text-right" : "text-right"}>{cellText}</p>
}
